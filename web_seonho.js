/**
 * Developed by S.ho 2017.12.20
 * PMO the miner
 */
var _col;
var _row;
var _myNumber;
var _totalPlayerCount;
var mapInfo;
var adjusta = 97;
var MAX = 65535;

var GetName = function () {
    return "PMO";
};

var Initialize = function (myNumber, totalPlayerCount, col, row) {
    _myNumber = myNumber;
    _totalPlayerCount = totalPlayerCount;
    _col = col;
    _row = row;
};

var Process = function (playerPosition, playerPower, playerStun, mapBlocks) {


    playerPower = playerPower[_myNumber];
    mapInfo = Util.arrangeMap(mapBlocks);
    var myPosition = Util.parsed2x2(playerPosition[_myNumber]);
    var startPos = Util.nToa(myPosition[0]) + Util.nToa(myPosition[1]);
    var keyMap = Util.getAdj();

    var pmo = PMO(startPos, keyMap, playerPower);
    return pmo;
};

var PMO = function (startPos, keyMap, playerPower) {
    var startPos = startPos;
    var keyMap = keyMap;
    var dijkstra = {};
    var visited = {};

    for (var key in keyMap) {
        if (key != startPos) {
            dijkstra[key] = {
                parent: startPos,
                cost: MAX
            };
        } else {
            dijkstra[key] = {
                parent: startPos,
                cost: 1,
                blockCost: 1
            };
        }
    }

    var dijkstraKeys = Util.getKeys(dijkstra);

    function makeTable(startPos) {
        var adjKeys = Util.getKeys(keyMap[startPos]);
        visited[startPos] = true;

        for (var key in adjKeys) {
            var sourceCost = dijkstra[startPos].cost;
            if (!visited.hasOwnProperty(adjKeys[key])) {
                var blockCost = keyMap[startPos][adjKeys[key]];
                if (blockCost > 0) {
                    blockCost = Math.floor(blockCost / playerPower) + 1;
                    blockCost += blockCost % playerPower > 0 ? 1 : 0;
                } else {
                    blockCost++;
                }

                var totalCost = sourceCost + blockCost;
                var targetBlock = dijkstra[adjKeys[key]];

                if (targetBlock != startPos && totalCost < targetBlock.cost) {
                    dijkstra[adjKeys[key]] = {
                        parent: startPos,
                        cost: totalCost,
                        blockCost: blockCost
                    };
                }
            }
        }

        var minDijkCost = MAX;
        var minDijkKey;

        for (var key in dijkstraKeys) {
            if (
                !visited.hasOwnProperty(dijkstraKeys[key]) &&
                dijkstra[dijkstraKeys[key]].cost < minDijkCost
            ) {
                minDijkKey = dijkstraKeys[key];
                minDijkCost = dijkstra[dijkstraKeys[key]].cost;
            }
        }

        if (minDijkKey == undefined) {
            return;
        } else {
            makeTable(minDijkKey);
        }
    }

    var path = [];
    function findRoute(goalPos) {
        var curPos = goalPos;
        path.push(curPos);

        do {
            curPos = dijkstra[curPos].parent;
            path.unshift(curPos);
        } while (curPos != startPos);
    }

    makeTable(startPos);

    var minKey;
    var minCost = MAX;
    var emergencyMinKey;
    var emergencyMinCost = MAX;
    for (var key in dijkstra) {
        var cost = dijkstra[key].cost;
        var originCost = dijkstra[key].blockCost;
        if(originCost == 0){
          emergencyMinKey = key;
          emergencyMinCost = cost;
        }
        if (originCost < 0 && cost < minCost) {
            minKey = key;
            minCost = cost;
        }
    }

    if(minKey === undefined){
      findRoute(emergencyMinKey);
    } else {
      findRoute(minKey);
    }
    

    function changeToOrigin(pos) {
        var x = [];
        for (var i = 0; i < 2; i++) {
            x.push(pos.charCodeAt(i) - adjusta);
        }

        return x;
    }

    var curPos = changeToOrigin(startPos);
    var nextPos = changeToOrigin(path[1]);

    if (curPos[0] != nextPos[0]) {
        return curPos[0] < nextPos[0] ? 2 : 0;
    } else if (curPos[1] != nextPos[1]) {
        return curPos[1] < nextPos[1] ? 1 : 3;
    }
};

var Util = (function () {
    this.make2Arr = function (_col, _row) {
        var arr = [];
        arr.length = _row;
        for (var i = 0; i < arr.length; i++) {
            arr[i] = [];
            arr[i].length = _col;
            for (var j = 0; j < arr[i].length; j++) {
                arr[i][j] = [];
            }
        }
        return arr;
    };

    this.merge_options = function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    };

    this.arrangeMap = function (mapBlocks) {
        var parsedBlocks = parsedWeight(mapBlocks);
        var returnArr = [];
        for (var i = 0; i < _row; i++) {
            var temp = parsedBlocks.splice(0, _col);
            returnArr.push(temp);
        }

        return returnArr;
    };

    this.parsedWeight = function (mapBlocks) {
        var returnArr = [];
        var arrLen = mapBlocks.Length;
        var totalBlock = 0;
        var blockCounter = 0;
        var avrHardness = 0;
        for (var i = 0; i < arrLen; i++){
          if(mapBlocks[i] > 0){
            totalBlock += mapBlocks[i];
            blockCounter++;
          }
        }
  
        avrHardness = totalBlock / blockCounter;

        for (var i = 0; i < arrLen; i++) {
            var block = mapBlocks[i];
            switch (block) {
                // 아이템 가중
                case -1009:
                  block = avrHardness < 6 ? -5 : -9;
                  break;
                case -1008:
                  block = avrHardness < 6 ? -4 : -8;
                  break;
                case -1007:
                  block = avrHardness < 6 ? -3 : -7;
                  break;
                case -1006:
                    block = -3;
                    break;
                case -1005:
                    block = -2;
                    break;
                case -1004:
                    block = -1;
                    break;
                case -1003:
                    block = -3;
                    break;
                case -1002:
                    block = -2;
                    break;
                case -1001:
                    block = -1;
                    break;
                case (-1, -2, -3, -5):
                  block--;
                  if(avrHardness < 6){
                    block *= 1.5;
                  } 
                  break;
            }
            returnArr.push(block);
        }

        return returnArr;
    };

    this.parsed2x2 = function (val) {
        return [Math.floor(val / _col), val % _col];
    };

    this.nToa = function (n) {
        return String.fromCharCode(n + adjusta);
    };

    this.getAdj = function () {
        var obj = {};
        var tempObj = {};
        var nToa = this.nToa;

        for (var i = 0; i < _row; i++) {
            for (var j = 0; j < _col; j++) {
                var originName = nToa(i, true) + nToa(j);
                if (!obj.hasOwnProperty(originName)) {
                    obj[originName] = {};
                }

                if (j - 1 >= 0) {
                    adjPos = nToa(i, true) + nToa(j - 1);
                    adjCost = mapInfo[i][j - 1];
                    obj[originName][adjPos] = adjCost;

                    obj = Util.merge(obj, tempObj);
                }

                if (j + 1 < _col) {
                    adjPos = nToa(i, true) + nToa(j + 1);
                    adjCost = mapInfo[i][j + 1];
                    obj[originName][adjPos] = adjCost;

                    obj = Util.merge(obj, tempObj);
                }

                if (i - 1 >= 0) {
                    adjPos = nToa(i - 1, true) + nToa(j);
                    adjCost = mapInfo[i - 1][j];
                    obj[originName][adjPos] = adjCost;

                    obj = Util.merge(obj, tempObj);
                }

                if (i + 1 < _row) {
                    adjPos = nToa(i + 1, true) + nToa(j);
                    adjCost = mapInfo[i + 1][j];
                    obj[originName][adjPos] = adjCost;

                    obj = Util.merge(obj, tempObj);
                }
            }
        }

        return obj;
    };

    this.getKeys = function (obj) {
        var arr = [];

        for (var key in obj) {
            arr.push(key);
        }

        return arr;
    };

    return {
        arrangeMap: arrangeMap,
        parsed2x2: parsed2x2,
        nToa: nToa,
        getAdj: getAdj,
        merge: merge_options,
        getKeys: getKeys
    };
})();
