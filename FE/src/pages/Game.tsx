import { Component, ChangeEvent } from "react";
import { GameLayout } from "../layouts/GameLayout";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { GameLogic } from "../components/game/GameLogic";
import { useAccessTokenState } from "../context/accessTokenContext";
import { useLocation } from "react-router-dom";

interface GameProps {
  nickname: string;
  gameCode: string;
}

function withNicknameAndGameCode(WrappedComponent: React.ComponentType<GameProps>) {
  return function () {
    const { nickname } = useAccessTokenState();
    const location = useLocation();
    const gameCode = location.state.gameCode;
    return <WrappedComponent nickname={nickname} gameCode={gameCode} />;
  };
}
const APPLICATION_SERVER_URL = "https://i9d206.p.ssafy.io";

interface AppState {
  mySessionId: string;
  myUserName: string;
  session?: any;
  mainStreamManager?: any;
  subscribers: any[];
  currentVideoDevice?: any;
  infoOn: boolean;
}

class Game extends Component<GameProps, AppState> {
  private OV: any;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      mySessionId: props.gameCode,
      myUserName: props.nickname,
      session: undefined,
      mainStreamManager: undefined,
      subscribers: [],
      infoOn: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.onSetInfoOn = this.onSetInfoOn.bind(this);
    this.setMyCamera = this.setMyCamera.bind(this);
    this.setMyMic = this.setMyMic.bind(this);
    this.setGameAudio = this.setGameAudio.bind(this);
    this.setUserVideo = this.setUserVideo.bind(this);
    this.setUserAudio = this.setUserAudio.bind(this);
  }

  setMyCamera(cameraOn: boolean) {
    if (this.state.mainStreamManager) {
      this.state.mainStreamManager.publishVideo(cameraOn);
    }
  }

  setMyMic(micOn: boolean) {
    if (this.state.mainStreamManager) {
      this.state.mainStreamManager.publishAudio(micOn);
    }
  }

  setGameAudio(soundOn: boolean) {
    let allAudio = document.querySelectorAll("audio");
    allAudio.forEach((item) => {
      let mediaItem = item as HTMLMediaElement;
      mediaItem.muted = !soundOn;
    });
  }

  setUserVideo(videoOn: boolean) {
    let allVideo = document.querySelectorAll("video");
    allVideo.forEach((item) => {
      let mediaItem = item as HTMLMediaElement;
      mediaItem.style.display = videoOn ? "block" : "none";
    });
  }

  setUserAudio(soundOn: boolean) {
    let allAudio = document.querySelectorAll("video");
    allAudio.forEach((item) => {
      let mediaItem = item as HTMLMediaElement;
      mediaItem.muted = !soundOn;
    });
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
        console.log("state1", this.state);
        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event: any) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own

          const subscriber = mySession.subscribe(event.stream, undefined);
          const subscribers = [...this.state.subscribers];
          subscribers.push(subscriber);

          this.setState((prevState) => ({
            subscribers: [...prevState.subscribers, subscriber],
          }));
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
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        console.log("state2", this.state);
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

            const subscribers = [...this.state.subscribers];

            this.setState({
              subscribers: subscribers,
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
      APPLICATION_SERVER_URL + "/api/v1/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId: string) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/api/v1/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }

  render() {
    const infoOn = this.state.infoOn;
    const subscribers = this.state.subscribers;
    const onSetInfoOn = this.onSetInfoOn;
    const setMyCamera = this.setMyCamera;
    const setMyMic = this.setMyMic;
    const setGameAudio = this.setGameAudio;
    const setUserVideo = this.setUserVideo;
    const setUserAudio = this.setUserAudio;

    return (
      <div className="mx-auto my-auto">
        {this.state.session === undefined ? (
          <div>
            <p className="text-white flex text-[96px]">Now Loading...</p>
          </div>
        ) : (
          <div id="session">
            <GameLayout>
              <GameLogic
                infoOn={infoOn}
                mainStreamManager={this.state.mainStreamManager}
                subscribers={subscribers}
                onSetInfoOn={onSetInfoOn}
                setMyCamera={setMyCamera}
                setMyMic={setMyMic}
                setGameAudio={setGameAudio}
                setUserVideo={setUserVideo}
                setUserAudio={setUserAudio}
              />
            </GameLayout>
          </div>
        )}
      </div>
    );
  }
}

export default withNicknameAndGameCode(Game);
