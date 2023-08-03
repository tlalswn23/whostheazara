import { Component, ChangeEvent } from "react";
import { GameCamList } from "../components/game/GameCamList";
import { GameChat } from "../components/game/GameChat";
import { GameMenu } from "../components/game/GameMenu";
import { GameTimer } from "../components/game/GameTimer";
import { GameJobInfo } from "../components/modal/GameJobInfo";
import { GameLayout } from "../layouts/GameLayout";
import { GameVote } from "../components/game/GameVote";
import { GameRabbit } from "../components/game/GameRabbit";

import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { GameMyJob } from "../components/modal/GameMyJob";

//const APPLICATION_SERVER_URL = "http://localhost:5000/";
const APPLICATION_SERVER_URL = "https://demos.openvidu.io/";
//const APPLICATION_SERVER_URL = "http://192.168.100.93:5000/";
//const APPLICATION_SERVER_URL = "https://i9d206.p.ssafy.io/";

interface AppState {
  mySessionId: string;
  myUserName: string;
  session?: any;
  mainStreamManager?: any;
  subscribers: any[];
  currentVideoDevice?: any;
  infoOn: boolean;
  viewVote: boolean;
}

class Game extends Component<Record<string, unknown>, AppState> {
  private OV: any;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      mySessionId: "SessionABCAA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      subscribers: [],
      infoOn: false,
      viewVote: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.onSetViewVote = this.onSetViewVote.bind(this);
    this.onSetInfoOn = this.onSetInfoOn.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  toggleVideo() {
    if (this.state.mainStreamManager) {
      // This will toggle video between on/off
      let videoCurrentlyEnabled = this.state.mainStreamManager.stream.videoActive;
      this.state.mainStreamManager.publishVideo(!videoCurrentlyEnabled);
    }
  }

  onSetViewVote() {
    this.setState({ viewVote: !this.state.viewVote });
  }

  onSetInfoOn() {
    this.setState({ infoOn: !this.state.infoOn });
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload() {
    this.leaveSession();
  }

  handleChangeSessionId(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream: any) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager: any) {
    const subscribers = this.state.subscribers;
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  async joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        const mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event: any) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own

          const subscriber = mySession.subscribe(event.stream, undefined);

          const subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          
          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event: any) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception: any) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        let token = await this.getToken();
        //token = token.replace("localhost:4443", "192.168.100.93:4443")
        //console.log("TOKEN!!!!!!!!!!!!")
        //console.log(token)
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
          .connect(token, { clientData: this.state.myUserName })
          .then(async () => {
            // --- 5) Get your own camera stream ---
            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            const publisher = await this.OV.initPublisherAsync(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "375x240", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);

            // Obtain the current video device in use
            const devices = await this.OV.getDevices();
            const videoDevices = devices.filter((device: any) => device.kind === "videoinput");
            const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            const currentVideoDevice = videoDevices.find((device: any) => device.deviceId === currentVideoDeviceId);

            // Set the main video in the page to display our webcam and store our Publisher
            this.setState({
              currentVideoDevice: currentVideoDevice,
              mainStreamManager: publisher,
            });
          })
          .catch((error: any) => {
            console.log("There was an error connecting to the session:", error.code, error.message);
          });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    this.state.subscribers.map((sub) => {
      console.log(sub);
    });
    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      mySessionId: "SessionABC",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      const videoDevices = devices.filter((device: any) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device: any) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          const newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId: string) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId: string) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }

  render() {
    const infoOn = this.state.infoOn;
    const viewVote = this.state.viewVote;
    const onSetInfoOn = this.onSetInfoOn;
    const onSetViewVote = this.onSetViewVote;
    const toggleVideo = this.toggleVideo;
    
    return (
      <div className="container mx-auto my-auto">
        {this.state.session === undefined ? (
          <div>
            <p className="text-white flex text-[96px]">
              Now Loading...
            </p>
          </div>
        ) : (
          <div id="session">            
            <GameLayout>            
              <GameCamList mainStreamManager={this.state.mainStreamManager} subscribers={this.state.subscribers} />
              <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
              <GameMyJob />
              {viewVote && <GameVote />}
              <GameMenu onSetInfoOn={onSetInfoOn} toggleVideo={toggleVideo}/>
              <GameChat />
              <GameRabbit />
              <GameTimer onSetViewVote={onSetViewVote} />
            </GameLayout>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
