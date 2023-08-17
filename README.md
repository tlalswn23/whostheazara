# 🚀S09P12D206 치뽈팀 프로젝트

## 🔍프로젝트 소개

### 📌서비스 요약

- 마피아 게임의 룰을 기반으로하여 웹에서 즐길 수 있는 게임 서비스
- 기존 다른 마피아 게임 서비스에 WEB RTC를 적용하여 화상 및 음성 채팅을 통해 게임을 즐길 수 있음

### 📌기획 의도

- 마피아 게임을 웹에서 즐길 수 있는 서비스를 제공하여 마피아 게임의 접근성을 높임
- WEB RTC를 적용하여 화상 및 음성 채팅을 통해 마피아 게임을 더 즐겁게 즐길 수 있음

### 📌기술 스택

<img src="https://img.shields.io/badge/typescript-3178C6?styleflat&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?styleflat&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?styleflat&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?styleflat&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/springboot-6DB33F?styleflat&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/springsecurity-6DB33F?styleflat&logo=springsecurity&logoColor=white">

### 📌협업 및 배포 툴

<img src="https://img.shields.io/badge/figma-F24E1E?styleflat&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/gitlab-FC6D26?styleflat&logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?styleflat&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/jenkins-D24939?styleflat&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?styleflat&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/mattermost-0058CC?styleflat&logo=mattermost&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?styleflat&logo=jira&logoColor=white">

### 📌프로젝트 기간

- 2023.07.10 ~ 2023.08.18

## 🙍팀원 소개

## 📑Convention

### 📌Git Commit Convention

#### 1. 커밋 유형

- 커밋 제목 첫 글자는 대문자로 작성하기

  | 커밋 유형 | 의미 |
  | --- | --- |
  | Feat | 새로운 기능 추가 |
  | Fix | 버그 수정 |
  | Docs | 문서 수정 |
  | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
  | Refactor | 코드 리팩토링 |
  | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
  | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
  | Design | CSS 등 사용자 UI 디자인 변경 |
  | Comment | 필요한 주석 추가 및 변경 |
  | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
  | Remove | 파일을 삭제하는 작업만 수행한 경우 |
  | !BREAKING CHANGE | 커다란 API 변경의 경우 |
  | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

#### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

#### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

#### 4. 제목은 영문 기준 50자 이내로 할 것

#### 5. 무엇을 왜 했는지 적기, 어떻게 했는지 적지 않기

### 📌Git Branch Convention

#### 규칙

- `master`에서 각자의 기능 브랜치를 분기
- 브랜치 이름 규칙
  - `작업종류/기능` 으로 브랜치 만들기
  - (지라 스토리 이슈 = 기능 명세서 소 분류 = 브랜치 1개)
  - (지라 작업 이슈 = 커밋 1개)
  - `design/FE-logout` `feat/BE-signup` `fix/FE-not-render-nav`
- 해당 기능의 브랜치에 작업이 완료 되면 해당 브랜치를 원격 저장소에 `push`하고 git Lab 페이지에서 `merge request(source : 본인 기능 브랜치, target : master)`(로컬에서 그냥 `merge` X)
  - `merge request` 오픈 이벤트 발생 시 EC2에서 빌드, 배포 실행 ⇒ MM으로 결과 알림
- `merge request` 위 결과에 따라 승인 여부 결정, 필요한 경우 코드 리뷰 및 토의
- `merge request`가 승인되면 `merge된 master` 브랜치에대하여 다시 EC2에서 빌드, 배포 실행 ⇒ MM으로 결과 알림
  - EC2에서 테스트 코드 실행 / 빌드(번들링 등의 파일 빌드) / 배포 진행 ⇒ 메신저로 결과 알림

#### 주의

- `master` 브랜치로 부터 개발하는 용도 외의 복사본 용을 git clone하여 `master` 브랜치로 부터 계속 pull 받으면서 복사본으로 사용\*\*
- `merge request` 승인 후 에러 생길 시 `git revert` 사용 권장\*\*
- **원격 저장소 `master`에 `merge` 이후 꼭 잊지말고 `master` 에서 `pull` 하기**

### 📌Code Convention

#### 백, 프론트 공통 코드 컨벤션

- 메소드 파라미터는 최대 4개 이하
- 의미 있는 공백 넣기
- 메소드는 최대 30줄 이하
- 들여쓰기 깊이는 최대 3칸
- 함수명, 변수명은 카멜케이스
- 주석은 설명하려는 구문에 맞춰 들여쓰기

  ```
  function someFunction() {
  ...

    // statement에 관한 주석
    statements
  }
  ```

- 지역 변수의 범위를 최소화 하기 위해, 처음 사용되는 지점에 가깝게 선언

#### 프론트엔드 코드 컨벤션

- 객체 타입 선언시 interface, 그외 type 사용

  ```typescript
  interface propsType {
    name: string;
  }

  type name = number | string;
  ```

- React는 화살표를 사용한 함수형 컴포넌트, props 타입 직접 지정

  ```typescript
  import React from 'react';

  type propsType = {
    name: string;
  };

  const test = ({ name }: propsType) => {
    return <div>test</div>;
  };

  export default test;
  ```

#### 백엔드 코드 컨벤션

- 모든 변수는 하나의 한개만 선언

  ```java
  int a, b; // X

  int a;
  int b; // O
  ```

- package 이름 : 소문자와 숫자만 사용 `ex) com.example.deepspace`

- Class 이름 : 첫 번째 문자를 대문자로 시작하며, 명사로 작성

  ```java
  class Test { }

  //단어가 2개 이상 혼합되어 있다면,
  //각 단어의 첫 번째 문자를 대문자로 표현
  class UserInfo { }
  ```

- Interface 이름 : 첫 번째 문자를 대문자interface Runnable { }로 시작하며, 형용사로 작성

  ```java
  interface Runnable { }
  interface ActionListener { }
  ```

- C style 배열선언 금지
  ```java
  String[] args // O
  String args[] // X
  ```
- 구현부가 없거나 한 줄의 구문을 포함해도 중괄호를 사용한다.

  ```java
  if(a > b) {
  a = b;
  }
  ```

- 상수는 모두 대문자로 작성하며, 단어 사이를 밑줄(\_)로 구분
- 클래스의 멤버와 initializer 의 순서는 따로 없지만, 최대한 논리적인 순서를 따름 새 메서드를 끝에 추가하는 것은 시간순이지 논리적인 순서가 아님
- 빈 블록은 줄바꿈하지 않고 {} 로 사용 multi-block(if/else, try/catch/finally) 은 줄바꿈
- 같은 동일한 이름의 메서드, 생성자는 연속적으로 작성
- @Override: 항상 사용

### 📌Jira Convention

#### 이슈 구조

- `최상단 에픽 이슈` : 개발, 테스트, 배포, 설계 - 포인트 x
- `중단 스토리 이슈` : 기능 명세서 소분류 - 포인트 x
- `하단 작업 이슈` : 명세서 소분류의 하위 작업들 - 포인트 부여
  - 이때, 작업 이슈를 따로 만들고 이슈 연결을 해야함
  - 1 포인트 = 1시간으로 포인트 부여하고 하루 최소 8포인트 부여

#### 이슈 구조 만들기

1. `에픽 이슈` 생성
2. `에픽 이슈`에서 `하위 이슈 추가 버튼` 클릭하여 `스토리 이슈` 생성
3. `작업 이슈`를 따로 생성
4. 2에서 만든 `스토리 이슈`에서 `이슈 연결 버튼` 클릭하여 작업 이슈와 연결

#### 1주일의 스프린트 사용 FLOW

1. `백로그`에 이슈 만들기 - 위 참고
2. `스프린트 만들기`(기간은 그 주 월요일 ~ 일요일)
3. `백로그`에서 만든 이슈(스토리 이슈와 작업 이슈)를 모두 `스프린트`로 옮기기
   1. 이때, `스토리 이슈` 바로 밑에 연결되는 `작업 이슈`를 위치하게 하여 정리하기
4. `스프린트 시작 버튼` 클릭
5. `작업 이슈`에 `진행 중`으로 표시 추가적으로 `진행 중` 표시하고 `포인트 부여`하고 일 시작
   1. 이때 오늘 `하루 8포인트(8시간)`을 적당히 나누어 `작업 이슈`에 부여한다, 최소 8포인트이고 이상 포인트 가능
   2. 1개의 작업 이슈에 할당할 수 있는 포인트는 1~4 포인트
   3. 이때 해당 `작업 이슈` 의 상위에 `스토리 이슈`에도 `진행 중 표시`하기
6. `작업 이슈`에 해당하는 일이 완료 되면 `완료 표시`하기
   1. 이때 `스토리 이슈`에 해당하는 `모든 작업 이슈`가 완료되면 `스토리 이슈`도 `완료 표시`하기
7. 스프린트 완료 일요일 날 되면 꼭 누르기

#### 추가 주의사항

- Git Lab 연동 고려
- 진행 중 이슈는 항상 1개이어야 한다
- 빠질 일이 있으면 그 만큼 포인트 차감하여도 됨
- 싸피에서 진행하는 라이브 등의 싸피 일정 추가하여도 됨

## 📚명세서

### 📌요구사항 명세서

![image](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/c27e88c1-9d2e-42df-907f-445aa75c7756) ![image-3](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/cfa6c541-3076-4659-9ec9-f441acaa0921) ![image-1](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/c3cc1bb1-2edb-4203-81c9-95d63d006a9d)

### 📌기능 명세서

![image-4](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/4d603214-176d-4210-8d52-b29e7a3f6f78) ![image-5](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/f8a904dd-6e6d-4856-9d6e-4230451b98b2) ![image-6](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/68a092ee-0c1f-4226-a414-29364d154f5e) ![image-7](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/aaabf6c4-04b4-4649-a4b2-428082b9b813)

### 📌API 명세서

#### HTTPS

![image-8](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/49df4ea5-c5a1-435c-ae0e-611e05817c35) ![image-9](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/58c3cc55-1e76-4ba1-b0e4-3675cec952ab) ![image-10](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/473324db-56b5-4210-ba53-6fe173c74e68) ![image-11](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/ef46373b-b503-4625-aa5b-07c81ba39ec1) ![image-12](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/66893c63-f0cf-4420-af0f-fe32a958b6ae) ![image-13](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/188bb50a-6c3a-4fa5-a3a2-c36455b6d090)

#### WSS

![image-14](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/28637a85-809b-4fd6-9513-e83763cdc35b) ![image-15](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/9592e4a7-fd38-4860-904f-36a1e33f496f) ![image-16](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/ef9bf0d1-cc76-40ed-be4e-193b3861086e) ![image-17](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/13842d85-9b35-42ce-bbc7-4863de4c87d8) ![image-18](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/840b91e3-60c9-49b1-903e-3138d02b017f) ![image-19](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/074e71a4-04a5-4cef-9db7-4a24a7681640) ![image-20](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/f0c62482-74a1-48fa-b2f8-01dd27cc72ae) ![image-21](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/bc3d3db1-c876-4dbe-a115-9f86a1317ecb) ![image-22](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/661e62c6-1ffc-48cf-a11c-e83b36b33729)

## 설계

### 📌아키텍처 설계

![image (1)](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/fdaabc15-537f-49dc-97e1-759d8332dc6b)

### 📌DB 설계 (ERD)

![image-23](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/d5ab6c69-b29b-4abd-b9d0-a1962b90fcb0)

## 실제 화면

### 회원가입

![회원가입](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/5a78e29a-6c81-4a67-90ac-0697671fa0db)

### 로그인

![로그인](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/6e81432e-db9d-4d91-a58c-c8ba0184bd0c)

### 게임 설명

![게임설명](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/aebf4e6c-b2fb-4c45-8682-c36a6378831a)

### 방 생성

![방생성](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/b98554f5-07c2-4213-9fff-e022bbd71795)

### 방 입장

![방입장](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/dbd22e8e-2dd8-4db7-a518-986204eefaae)

### 방 설정 변경 및 채팅

![방안에서수정및채팅](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/c21d81ad-867e-4938-84d0-026d2e0c62a0)

### 게임 시작

![게임시작](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/5170d558-1363-4dfd-9cf7-896d0beb7326)

### 게임 중 채팅

![게임중채팅](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/014ac7fb-9041-4b1c-a97b-ec4eba6b5e9a)

### 투표

![투표](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/29af56ab-2ec7-40f0-a710-1ad661666f80)

### 투표 처형

![투표처형](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/c6dfc896-dfa1-4136-8e75-e55e4dd850fd)

### 밤에 직업에 따른 능력 사용

![밤능력사용](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/b5e9a354-c0de-4527-a188-ebe3f93707b9)

### 능력 사용 성공

![능력성공](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/685d76e3-d89a-480a-9e75-ce187ecacce8)

### 게임 결과 및 방 복귀

![게임결과](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/b6b270c7-64b9-4db7-b0d3-3c7332dba21e)

### 프로필에서 전적 확인

![프로필](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/491cfe4f-6941-475b-896e-a1b58848e92b)

### 옷장에서 아이템 구입 및 장착

![아이템구매](https://github.com/Jeongseulho/JWT-pjt/assets/110578739/c41b4c8d-1f12-4e08-82a4-f2f715c65b20)
