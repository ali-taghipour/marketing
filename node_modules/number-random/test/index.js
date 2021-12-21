const assert = require('assert');
const random = require('../index');

function run(fn, times) {
  while (times > 0) {
    fn();
    times--;
  }
}

describe('integer', function () {

  describe('random(1, 2)', function () {
    it('should return 1 or 2', function () {
      let res = {};
      run(function () {
        let num = random(1, 2);
        res[num] = true;
        assert(num === 1 || num === 2);
      }, 100000);
      assert(res[1] && res[2]);
    });
  });

  describe('random(1)', function () {
    it('should return 0 or 1', function () {
      let res = {};
      run(function () {
        let num = random(0, 1);
        res[num] = true;
        assert(num === 0 || num === 1);
      }, 100000);
      assert(res[0] && res[1]);
    });
  });

  describe('random(-1)', function () {
    it('should return 0 or -1', function () {
      let res = {};
      run(function () {
        let num = random(-1);
        res[num] = true;
        assert(num === 0 || num === -1);
      }, 100000);
      assert(res[0] && res[-1]);
    });
  });

  describe('random(5)', function () {
    it('should return 0/1/2/3/4/5', function () {
      let res = {};
      run(function () {
        let num = random(5);
        res[num] = true;
        assert(num >= 0 && num <= 5);
      }, 100000);
      assert(res[0] && res[5]);
    });
  });

  describe('random(5,1)', function () {
    it('should return 1/2/3/4/5', function () {
      let res = {};
      run(function () {
        let num = random(5, 1);
        res[num] = true;
        assert(num >= 1 && num <= 5);
      }, 100000);
      assert(res[1] && res[5]);
    });
  });

  describe('random(100,999)', function () {
    it('should return 100~999', function () {
      let res = {};
      run(function () {
        let num = random(100, 999);
        res[num] = true;
        assert(num >= 100 && num <= 999);
      }, 100000);
      assert(res[100] && res[999]);
    });
  });

});

describe('float', function () {

  describe('random()', function () {
    it('should return 0.0~1.0', function () {
      run(function () {
        let num = random();
        assert(num > 0 && num < 1);
      }, 100000);
    });
  });

  describe('random(100,999,true)', function () {
    it('should return 100.0~999.9', function () {
      run(function () {
        let num = random(100, 999, true);
        assert(num >= 100 && num <= 999 && parseInt(num) != num);
      }, 100000);
    });
  });

  describe('random(0,1,true)', function () {
    it('should return 0.0~1.0', function () {
      run(function () {
        let num = random(0, 1, true);
        assert(num > 0 && num < 1);
      }, 100000);
    });
  });

  describe('random(10000,99999,4)', function () {
    it('should return 10000.0000~99998.9999', function () {
      run(function () {
        let num = random(10000, 99999, 4);
        assert(num >= 10000 && num <= 99999 && parseInt(num) !== num && num.toString().length === 10);
      }, 100000);
    });
  });
});
