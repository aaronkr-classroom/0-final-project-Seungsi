// controllers/spaceController.js
"use strict";

const spaceController = require("../models/space"); // 사용자 모델 요청

module.exports = {
  index: (req, res, next) => {
    Sports.find() // index 액션에서만 퀴리 실행
      .then((space) => {
        // 사용자 배열로 index 페이지 렌더링
        res.locals.space = space; // 응답상에서 사용자 데이터를 저장하고 다음 미들웨어 함수 호출
        next();
      })
      .catch((error) => {
        // 로그 메시지를 출력하고 홈페이지로 리디렉션
        console.log(`Error fetching spaces: ${error.message}`);
        next(error); // 에러를 캐치하고 다음 미들웨어로 전달
      });
  },
  indexView: (req, res) => {
    res.render("spacespace/index", {
      page: "space",
      title: "All space",
    }); // 분리된 액션으로 뷰 렌더링
  },

  new: (req, res) => {
    res.render("space/new", {
      page: "new-space",
      title: "New space",
    });
  },
  create: (req, res, next) => {
    let spaceParams = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      profileImg: req.body.profileImg,
    };
    // 폼 파라미터로 사용자 생성
    space.create(spaceParams)
      .then((space) => {
        res.locals.redirect = "/space";
        res.locals.space = space;
        next();
      })
      .catch((error) => {
        console.log(`Error saving sports: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let spacerId = req.params.id; // request params로부터 사용자 ID 수집
    space.findById(spacerId) // ID로 사용자 찾기
      .then((space) => {
        res.locals.space = space; // 응답 객체를 통해 다음 믿들웨어 함수로 사용자 전달
        next();
      })
      .catch((error) => {
        console.log(`Error fetching space by ID: ${error.message}`);
        next(error); // 에러를 로깅하고 다음 함수로 전달
      });
  },
  showView: (req, res) => {
    res.render("space/show", {
      page: "space-details",
      title: "space Details",
    });
  },
  edit: (req, res, next) => {
    let spaceId = req.params.id;
    space.findById(spaceId) // ID로 데이터베이스에서 사용자를 찾기 위한 findById 사용
      .then((space) => {
        res.render("space/edit", {
          space: space,
          page: space.name,
          title: "Edit space",
        }); // 데이터베이스에서 내 특정 사용자를 위한 편집 페이지 렌더링
      })
      .catch((error) => {
        console.log(`Error fetching spacer by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let spaceId = req.params.id,
    spaceParams = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      profileImg: req.body.profileImg,
    };

    space.findByIdAndUpdate(sportsId, {
      $set: spaceParams,
    }) //ID로 사용자를 찾아 단일 명령으로 레코드를 수정하기 위한 findByIdAndUpdate의 사용
      .then((space) => {
        res.locals.redirect = `/space/${spaceId}`;
        res.locals.space = space;
        next(); // 지역 변수로서 응답하기 위해 사용자를 추가하고 다음 미들웨어 함수 호출
      })
      .catch((error) => {
        console.log(`Error updating space by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let spaceId = req.params.id;
    space.findByIdAndRemove(spaceId) // findByIdAndRemove 메소드를 이용한 사용자 삭제
      .then(() => {
        res.locals.redirect = "/space";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting space by ID: ${error.message}`);
        next();
      });
  },
  deleteAll: (req, res, next) => {
    space.deleteMany({})
      .then(() => {
        res.locals.redirect = "/space";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting all space: ${error.message}`);
        next(error); // next()에 error를 전달하여 다음 미들웨어로 넘김
      });
  }
}