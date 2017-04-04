Array.prototype.map = function (callback) {
  let result = [];
  this.forEach((item, index) => {
    result.push(callback(item, index));
  });
  return result;
};

Array.prototype.filter = function (callback) {
  let result = [];
  this.forEach((item, index) => {
    if (callback(item, index)) {
      result.push(item);
    }
  });
  return result;
};

Array.prototype.concatAll = function () {
  let result = [];
  this.forEach((item) => {
    if (typeof item === 'number') {
      result.push(item);
    }
    result.push(...item);
  });
  return result;
};
let newCourseList = [
  {
    "name": "My Courses",
    "courses": [{
      "id": 511019,
      "title": "React for Beginners",
      "covers": [{
        width: 150,
        height: 200,
        url: "http://placeimg.com/150/200/tech"
      }, {
        width: 200,
        height: 200,
        url: "http://placeimg.com/200/200/tech"
      }, {
        width: 300,
        height: 200,
        url: "http://placeimg.com/300/200/tech"
      }],
      "tags": [{
        id: 1,
        name: "JavaScript"
      }],
      "rating": 5
    }, {
      "id": 511020,
      "title": "Front-End automat workflow",
      "covers": [{
        width: 150,
        height: 200,
        url: "http://placeimg.com/150/200/arch"
      }, {
        width: 200,
        height: 200,
        url: "http://placeimg.com/200/200/arch"
      }, {
        width: 300,
        height: 200,
        url: "http://placeimg.com/300/200/arch"
      }],
      "tags": [{
        "id": 2,
        "name": "gulp"
      }, {
        "id": 3,
        "name": "webpack"
      }],
      "rating": 5
    }]
  },
  {
    "name": "New Release",
    "courses": [{
      "id": 511022,
      "title": "Vue2 for Beginners",
      "covers": [{
        width: 150,
        height: 200,
        url: "http://placeimg.com/150/200/nature"
      }, {
        width: 200,
        height: 200,
        url: "http://placeimg.com/200/200/nature"
      }, {
        width: 300,
        height: 200,
        url: "http://placeimg.com/300/200/nature"
      }],
      "tags": [{
        id: 1,
        name: "JavaScript"
      }],
      "rating": 5
    }, {
      "id": 511023,
      "title": "Angular2 for Beginners",
      "covers": [{
        width: 150,
        height: 200,
        url: "http://placeimg.com/150/200/people"
      }, {
        width: 200,
        height: 200,
        url: "http://placeimg.com/200/200/people"
      }, {
        width: 300,
        height: 200,
        url: "http://placeimg.com/300/200/people"
      }],
      "tags": [{
        id: 1,
        name: "JavaScript"
      }],
      "rating": 5
    }]
  }
];

let idAndTitle = newCourseList.map(List => List.courses
  .map(items => items.covers.filter(cover => cover.width === 150)
    .map(item => {
      return {
        id: items.id,
        title: items.title,
        cover: item.url
      }
    })
  ).concatAll()
).concatAll();

console.log(idAndTitle);