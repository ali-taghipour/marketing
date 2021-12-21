#[number-random](https://github.com/maichong/number-random)

Generate random number in a range

## Installation

number-random is available as an [npm package](https://www.npmjs.com/package/number-random).

```sh
npm i number-random
```

## Example

```javascript

const random = require('number-random');

random(0,1);     // 0 or 1
random(1);       // 0 or 1
random(100);     // 0~100
random(100,999); // 100~999
random(100,999,true);   //663.7264946557116
random(100,999,4);      //346.5673
random(0,1,true);       //0.1557056098245
random();               //0.3497616536915302

```

## Contribute
[Maichong Cloud](http://maichong.io)

[Liang Xingchen](https://github.com/liangxingchen)

## License

This project is licensed under the terms of the MIT license
