var sampleData = [0, 6, 0, 0, -5, 6, -3, -2, 0, 6, -1, -5, 0, 0, 6, 0, -1, -3, 6, 0, -3, 0, 6, 0, 0, 6, -3, 6, -3, 6, 0, 6, -3, 6, 0, 6, 6, 0, 6, -3, 6, 0, 6, -1, 6, 0, 6, 0, 0, 6, 0, 6, 0, 6, 0, 6, -2, 6, 0, 6, 6, 0, 6, 0, 6, -1, 6, 0, 6, 0, 6, -2, -2, 6, 0, 6, 0, 6, 0, 6, -1, 6, 0, 6, 6, 0, 6, -2, 6, -5, 6, -2, 6, -3, 6, 0, -1, 6, -2, 6, 0, 6, 0, 6, 0, 6, 0, 6, 6, 0, 6, 0, 6, -2, 6, -1, 6, 0, 6, -5, -2, 6, 0, 6, 0, 6, 0, 6, 0, 6, -1, 6, 6, -1, 6, 0, 6, 0, 6, -2, 6, 0, 6, 0, -3, 6, 0, 6, -3, 6, 0, 6, 0, 6, -3, 6, 6, 0, 6, -3, 6, -2, 6, -2, 6, -3, 6, 0, 0, 6, 0, 6, -1, 6, -2, 6, -5, 6, 0, 6, 6, -5, 6, -3, 6, 0, 6, 0, 6, -1, 6, -3, -2, 0, -5, 6, 0, -1, -1, 6, -2, -3, 0, 6, 6, -1, -2, 0, 6, 0, -1, -5, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, -5, 0, 6, -3, 0, 0, 6, -2, 0, -1, 6, 6, 0, 0, -1, 6, -3, -3, 0, 6, 0, 0, -1, -2, 6, 0, 6, 0, 6, 0, 6, 0, 6, -1, 6, 6, -5, 6, 0, 6, -2, 6, -5, 6, 0, 6, 0, -1, 6, -2, 6, -1, 6, -5, 6, 0, 6, 0, 6, 6, 0, 6, -3, 6, 0, 6, -1, 6, -2, 6, 0, 0, 6, -3, 6, 0, 6, -3, 6, -2, 6, -3, 6, 6, -1, 6, 0, 6, -2, 6, -2, 6, -3, 6, 0, -2, 6, 0, 6, 0, 6, 0, 6, -2, 6, 0, 6, 6, 0, 6, 0, 6, 0, 6, -3, 6, 0, 6, 0, -3, 6, 0, 6, 0, 6, -1, 6, -2, 6, -3, 6, 6, -3, 6, -2, 6, 0, 6, 0, 6, 0, 6, 0, -1, 6, 0, 6, -2, 6, 0, 6, 0, 6, 0, 6, 6, -3, 6, 0, 6, -1, 6, 0, 6, -5, 6, -2, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, -3, 6, 6, -2, 6, 0, 6, 0, 6, -3, 6, 0, 6, 0, 0, 6, -3, 0, -5, 6, -1, 0, -5, 6, 0, 0, 0, -5, 6, 0, -1, 0, 6, 0, -1, -1, 6, 0]
  
var test = 0;
var _col;
var _row;
var _myNumber;
var _totalPlayerCount;
var endPoint;
var testArr;
var vertices = [];
var g;
var mapInfo;
var cachedPoint = [];
var f = [];
var _playerPower;
var myPos;

// note : JS file 로드시 초기에 한번 호출 됩니다. 본인의 이름 혹은 닉네임 리턴 해주시면 됩니다.
var GetName = function() {
  return 'Revine Kim';
};

// note : myNumber : 내 번호 (0 ~ 3 값)
// note : totalPlayerCount : 플레이어 수
// note : col : Map 너비
// note : row : Map 높이
// note : 본 함수는 시작과 함께 1회만 호출 됩니다.
var Initialize = function(myNumber, totalPlayerCount, col, row) {
  // Console.Info(myNumber);
  // Console.Info(totalPlayerCount);
  // Console.Info(col);
  // Console.Info(row);

  // 전역 변수로 정보 전달
  _myNumber = 0;
  _totalPlayerCount = totalPlayerCount;
  _col = 24;
  _row = 20;

  var n = _col > _row ? _col : _row;
};

// note : 게임 중 내내 호출 될 function 입니다.
// note : playerPosition[playerNumber] 하시면 해당 플레이어의 위치값을 알 수 있습니다.
// note : playerPower[playerNumber] 하시면 해당 플레이어의 곡갱이+ 값을 알 수 있습니다.
// note : playerStun[playerNumber] 하시면 해당 플레이어의 남은 스턴 턴 수를 알 수 있습니다.
// note : mapBlocks는 전체 맵을 나타내는 선형 int array입니다. mapBlocks가 가질 수 있는 값은 아래와 같습니다.
// note : ITEM_9 : 곡갱이 아이템 LV1, 본인의 Power를 +3만큼 증가시킨다. (Power 1당 1턴에 돌 블럭을 1만큼 제거한다.)
// note : ITEM_8 : 곡갱이 아이템 LV1, 본인의 Power를 +2만큼 증가시킨다.
// note : ITEM_7 : 곡갱이 아이템 LV1, 본인의 Power를 +1만큼 증가시킨다.
// note : ITEM_6 : 시간 정지 아이템 LV3, 본인을 제외한 플레이어들을 많은 턴수만큼 행동 불능으로 만든다. sqrt(col^2 + row^2)
// note : ITEM_5 : 시간 정지 아이템 LV2, 본인을 제외한 플레이어들을 중간 턴수만큼 행동 불능으로 만든다. sqrt(col^2 + row^2) * (2/3)
// note : ITEM_4 : 시간 정지 아이템 LV1, 본인을 제외한 플레이어들을 적은 턴수만큼 행동 불능으로 만든다. sqrt(col^2 + row^2) * (1/3)
// note : ITEM_3 : 산사태 아이템 LV3, 본인을 제외한 플레이어들의 주변 5칸을 무작위 돌블럭으로 메운다.
// note : ITEM_2 : 산사태 아이템 LV2, 본인을 제외한 플레이어들의 주변 3칸을 무작위 돌블럭으로 메운다.
// note : ITEM_1 : 산사태 아이템 LV1, 본인을 제외한 플레이어들의 주변 2칸을 무작위 돌블럭으로 메운다.
// note : GEM_5 : 다이아몬드 블럭 - 5 point
// note : GEM_3 : 금 블럭 - 3 point
// note : GEM_2 : 은 블럭 - 2 point
// note : GEM_1 : 동 블럭 - 1 point
// note : NONE : 아무것도 없는 블럭
// note : ROCK_1 : 내구도 1인 돌 블럭
// note : ROCK_2 : 내구도 2인 돌 블럭
// note : ROCK_3 : 내구도 3인 돌 블럭
// note : ROCK_4 : 내구도 4인 돌 블럭
// note : ROCK_5 : 내구도 5인 돌 블럭
// note : ROCK_6 : 내구도 6인 돌 블럭
var Process = function (playerPosition, playerPower, playerStun, mapBlocks) {
  // note : Breakpoint 잡고 실시간 디버깅이 가능하도록 환경을 제공 하고 싶었으나,
  //      JS Engin 디버깅 환경 설정이 좀 번거롭네요. 아래 코드로 Log/Mines.log 파일에 로그를 남길 수 있습니다.
  // Console.Info( playerPosition);
  // Console.Info( playerPower);
  // Console.Info( playerStun);

  playerPosition = [0, 123, 12, 14];

  

  var myPos = parsed2x2(playerPosition[_myNumber]);
  var mapInfo = arrangeMap(sampleData);
  var adj = getAdj(mapInfo);

  var x = myPos[0];
  var y = myPos[1];
  var minPos = [];
  var minPoint;
  var adjs = adj[x][y];

  function arrangeMap(mapBlocks){
    var parsedBlocks = parsedWeight(mapBlocks);
    var returnArr = [];
    for (var i = 0; i < _row; i++) {
        var temp = parsedBlocks.splice(0, _col);
        returnArr.push(temp);
    }

    return returnArr;
  }

  function parsedWeight(mapBlocks) {
      var returnArr = [];
      var arrLen = mapBlocks.length;
      for (var i = 0; i < arrLen; i++) {
          var block = mapBlocks[i];
          switch (block) {
              //곡괭이
              case -1009:
                  block = 9;
                  break;
              case -1008:
                  block = 8;
                  break;
              case -1007:
                  block = 7;
                  break;
              // 시간
              case -1006:
                  block = 3;
                  break;
              case -1005:
                  block = 2;
                  break;
              case -1004:
                  block = 1;
                  break;
              // 산사태
              case -1003:
                  block = 6;
                  break;
              case -1002:
                  block = 5;
                  break;
              case -1001:
                  block = 4;
                  break;
          }
          returnArr.push(block);
      }

      return returnArr;
  }

      function make2arr(i, j, val) {
        var arr = [];
        arr.length = j;
        for (var x = 0; x < j; x++) {
            arr[x] = val ? val : [];
            arr[x].length = i;
        }

        return arr;
    }

  function parsed2x2 (val) {
    return [Math.floor(val / _col), val % _col];
  };

  function getAdj(parsedBlock) {
    var adj = make2arr(_col, _row);
    for (var i = 0; i < _row; i++) {
        for (var j = 0; j < _col; j++) {
            adj[i][j] = [];
            if (i + 1 < _col) {
                var block = [i + 1, j];
                adj[i][j].push(block);
            }

            if (i - 1 >= 0) {
                var block = [i - 1, j];
                adj[i][j].push(block);
            }

            if (j + 1 < _row) {
                var block = [i, j + 1];
                adj[i][j].push(block);
            }

            if (j - 1 >= 0) {
                var block = [i, j - 1];
                adj[i][j].push(block);
            }
        }
    }

    return adj;
  }

  for(var i = 0; i < adjs.length; i++){
    var adjX = adjs[i][0];
    var adjY = adjs[i][1];

    var adjPoint = mapInfo[adjX][adjY];
    if(i == 0 || minPoint < adjPoint){
      minPos = adjs[i];
    }
  }

  if(myPos[0] > minPos[0]){
    return 3;
  }

  if(myPos[0] < minPos[0]){
    return 1;
  }

  if(myPos[1] > minPos[1]){
    return 2;
  }

  if(myPos[1] < minPos[1]){
    return 0;
  }
};
// note : 본인이 이동 하고 싶은 방향값을 반환 시켜 줍니다.
// note : 0 = 상, 1 = 우, 2 = 하, 3 = 좌
// note : 이동하려는 위치에 돌 블럭이 있을 경우, 본인이 가진 Power만큼 돌 블럭 가중치를 제거 합니다.
// note : Power가 3일때 6돌 블럭을 캘 경우, 6 - 3이 되어 3돌이 됩니다. 0값의 블럭으로만 이동이 가능 합니다.
// note : 맵의 가장자리로 이동 시, 제자리 걸음을 하게 되며 턴이 소모 됩니다.

// navi 객체
function Navi(v, myPos) {
  this.vertices = v;
  this.myPos = myPos;
  this.minPoint;
  this.minPos = [];
  
  var str = '';
  var idealPath = [];

  this.navigate = function() {
    for (var i = 0; i < this.vertices.length; i++) {
      var totalPoint = 0;
      var totalCost = 0;
      var pathPoint;
      var path = [];

      var goalPos = this.vertices[i];
      var distance = Math.sqrt(Math.pow(myPos[0] - goalPos[0], 2) + Math.pow(myPos[1] - goalPos[1], 2));
      for (var j = myPos[0]; j <= goalPos[0]; j++) {
        for (var k = myPos[1]; k <= goalPos[1]; k++) {
          if(mapInfo[j][k] < 0){
            totalCost += 1;
            totalPoint += mapInfo[j][k];
            var pos = [j, k]
            path.push(pos);
          } else {
            totalCost += mapInfo[j][k];
          }
        }
      }
      var lenX = Math.abs(myPos[0] - goalPos[0]);
      var lenY = Math.abs(myPos[1] - goalPos[1]);
      var pathLen = Util.f(lenX + lenY) / Util.f(lenX) / Util.f(lenY);
      pathPoint = totalPoint / totalCost;
      // if (i == 0 || pathPoint < minPoint) {
      //   minPoint = pathPoint;
      //   minPos = goalPos;
      // }
      if(path.length > idealPath.length){
        idealPath = path;
        minPoint = pathPoint;
        minPos = goalPos;
      }
    }
    console.log(minPos);
    console.log('point :' + totalPoint);
    console.log('minPoint : ' + minPoint);
    console.log('cost : ' + totalCost);
    console.log(pos);
  };
}

var PathFinder = function(){
  this.startPos = myPos;
  this.adj = make2arr(_col, _row);
  this.getAdj = function(parsedBlock){
      for(var i = 0; i < _row; i++) {
          for(var j = 0; j < _col; j++){
              this.adj[i][j] = [];
              if(i+1 < _col){
                  var block = [i+1, j];
                  this.adj[i][j].push(block);
              }
              
              if(i-1 >= 0){
                  var block = [i-1, j];
                  this.adj[i][j].push(block);
              }

              if(j+1 < _row){
                  var block = [i, j+1];
                  this.adj[i][j].push(block);
              }

              if(j-1 >= 0 ){
                  var block = [i, j-1];
                  this.adj[i][j].push(block);
              }
          }
      }
  }
  this.vertices = vertices;
  this.simple = function(){
    var x = myPos[0];
    var y = myPos[1];
    var minPos = [];
    var minPoint;
    var adjs = this.adj[x][y];
    for(var i = 0; i < adjs.length; i++){
      var adjX = adjs[i][0];
      var adjY = adjs[i][1];

      var adjPoint = mapInfo[adjX][adjY];
      if(i == 0 || minPoint < adjPoint){
        minPos = adjs[i];
      }
    }

    if(myPos[0] > minPos[0]){
      return 3;
    }

    if(myPos[0] < minPos[0]){
      return 1;
    }

    if(myPos[1] > minPos[1]){
      return 2;
    }

    if(myPos[1] < minPos[1]){
      return 0;
    }
  
  };


  this.getGoal = function() {
    var minDistance = 0;
    var minPos;
    var totalCost = 0;
    var minCost = 0;
    var minTurn = 0;
    var avrCost = 0;
    var totalTurn = 0;
    for (var i = 0; i < this.vertices.length; i++) {
      var goalPos = this.vertices[i];
      var distance = Math.sqrt(Math.pow(myPos[0] - goalPos[0], 2) + Math.pow(myPos[1] - goalPos[1], 2));
      var lenX = Util.getLen(myPos[0], goalPos[0]);
      var lenY = Util.getLen(myPos[1], goalPos[1]);
      totalCost = 0;
      totalTurn = 0;
  
      for(var j = myPos[0]; j <= goalPos[0]; j++){
        for(var k = myPos[1]; k <= goalPos[1]; k++){
          var val = mapInfo[j][k]
          totalCost += val < 0 ? val : 0;
          totalTurn += val < 0 ? 1 : (val == 0 ? 0 : (Math.floor(val/ _playerPower) + 1));
        }
      }
      avrCost = Math.floor(totalCost / totalTurn * 10000);
  
      if(i == 0 || minCost > avrCost) {
        minPos = goalPos;
        minCost = avrCost;
        minTurn = totalTurn;
      }
    }

    console.log(minPos);
    console.log(minCost);
    console.log(minTurn);
  }
  


  // this.navigate = function(pos){
  //   adjBlocks = this.adj[pos[0]][pos[1]];
  //   for (var i = 0; i < adjBlocks.length; i++){
  //     var adjBlock = adjBlocks[i];
  //     if(this.visited[adjBlock[0]][adjBlock[1]] == false){
  //       var blockCost = mapInfo[adjBlock[0]][adjBlock[1]]; 
  //     }
  //   }
  // }
}

var Util = (function() {
  this.getLen = function(x, y){ 
    var len = x - y == 0 ? 1 : x - y;
    return Math.abs(len);
  }

  this.make2arr = function(i, j, val){
    var arr = [];
    arr.length = j;
    for(var x = 0; x < j ; x++){
      arr[x] = val ? val : [];
      arr[x].length = i;
    }

    return arr;
  }

  this.factorial = function(n) {
    if (n == 0) {
      return 1;
    }
    if (n < 0) {
      return undefined;
    }
    for (var i = n; --i; ) {
      n *= i;
    }
    return n;
  };

  this.arrangeMap = function(mapBlocks) {
    var parsedBlocks = parsedWeight(mapBlocks);
    var returnArr = [];
    for (var i = 0; i < _row; i++) {
      var temp = parsedBlocks.splice(0, _col);
      returnArr.push(temp);
    }

    return returnArr;
  };

  this.parsedWeight = function(mapBlocks) {
    var returnArr = [];
    var arrLen = mapBlocks.length;
    for (var i = 0; i < arrLen; i++) {
      var block = mapBlocks[i];
      switch (block) {
        //곡괭이
        case -1009:
          block = 9;
          break;
        case -1008:
          block = 8;
          break;
        case -1007:
          block = 7;
          break;
        // 시간
        case -1006:
          block = 3;
          break;
        case -1005:
          block = 2;
          break;
        case -1004:
          block = 1;
          break;
        // 산사태
        case -1003:
          block = 6;
          break;
        case -1002:
          block = 5;
          break;
        case -1001:
          block = 4;
          break;
      }
      if (block < 0) {
        vertices.push(parsed2x2(i));
      }
      returnArr.push(block);
    }

    return returnArr;
  };

  this.parsed2x2 = function(val) {
    return [Math.floor(val / _col), val % _col];
  };

  return {
    arrangeMap: arrangeMap,
    parsed2x2: parsed2x2,
    f: factorial,
    getLen : getLen
  };
})();

Initialize();
Process();
