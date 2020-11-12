pragma solidity >=0.4.0 <=0.8.0;

contract Calculator {
  function plus(int x, int y) public pure returns(int){
    return (x+y);
  }

  function minus(int x, int y) public pure returns(int){
    return (x-y);
  }

  function divide(int x, int y) public pure returns(int){
    require(y!=0, "error, y is 0");
    return (x/y);
  }

  function moltiplie(int x, int y) public pure returns(int){
    return (x*y);
  }
}