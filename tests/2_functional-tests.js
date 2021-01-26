const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello?name=Toshiba55inch4kUhd", function (done) {
      chai
        .request(server)
        .get("/hello?name=Toshiba55inch4kUhd")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Toshiba55inch4kUhd");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        /** send {surname: 'Colombo'} here **/
        .send({ surname: 'Colombo' })
        // .send({...})
        .end(function (err, res) {
          
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(
            res.body.name,
            'Cristoforo',
          );
          assert.equal(
            res.body.surname,
            'Colombo',
          );

          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
        chai
        .request(server)
        .put('/travellers')
        .send({surname: "de Verrazzano"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
        })
      done();
    });
  });
});

const Browser = require("zombie");
Browser.site = 'https://testing-chai-fcc.cryscobyte.repl.co';
suite("Functional Tests with Zombie.js", function () {
  const browser = new Browser;
  suiteSetup(function(done) {
  return browser.visit('/', done);
});

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton("submit", function () {
        browser.assert.success();
        browser.assert.text('span#name', 'Cristoforo');
        browser.assert.text('span#surname', 'Colombo');
        browser.assert.text('span#dates', '1451 - 1506');
        browser.assert.element('span#dates', 1);
        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      assert.fail();

      done();
    });
  });
});
