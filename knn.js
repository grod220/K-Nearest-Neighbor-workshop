
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function (arr) {
  arr.forEach(function(element) {
    this.points.push(element);
  }, this);
};

KNN.prototype._distance = function (vector1, vector2) {
  var distance = 0;
  for (var i=0; i<vector1.length; i++) {
    distance += Math.abs(vector1[i] - vector2[i]);
  }
  return distance;
};

KNN.prototype._distances = function(vector, trainingArray) {
  var resultsArr = [];
  for (var i=0; i<trainingArray.length; i++) {
    resultsArr.push([this._distance(vector, trainingArray[i][0]),trainingArray[i][1]]);
  }
  return resultsArr;
};

KNN.prototype._sorted = function(arrayToSort) {
  var toReturn = [];
  arrayToSort.sort(function (a, b) {
    return a[0]-b[0];
  });
  for (var i=0; i<arrayToSort.length; i++) {
    toReturn.push(arrayToSort[i][1]);
  }
  return toReturn;
};

KNN.prototype._majority = function(kValue, array) {
  var holderObj = {};
  for (var i=0; i<kValue; i++) {
    if (!holderObj[array[i]]) {
      holderObj[array[i]] = 1;
    } else {
      holderObj[array[i]]++;
    }
  }
  // console.log(holderObj)
  var largestValue = 0;
  var largestNum;
  for (var number in holderObj) {
    if (holderObj[number] > largestValue) {
      largestNum = Number(number);
      largestValue = holderObj[number];
    }
  }
  // console.log(largestNum)
  return largestNum;
};

KNN.prototype.predictSingle = function(vectorToPredict) {
  var distanceArr = this._distances(vectorToPredict, this.points);
  var sortedArr = this._sorted(distanceArr);
  return this._majority(this.kSize, sortedArr);
};

KNN.prototype.predict = function (arrayOfVectors) {
  return arrayOfVectors.map(function(element) {
    return this.predictSingle(element);
  }, this);
};

KNN.prototype.score = function(arrayToScore) {
  var strippedOfClassArr = [];
  var counter = 0

  for (var i=0; i<arrayToScore.length; i++) {
    strippedOfClassArr.push(arrayToScore[i][0]);
  }

  var predictedClassArr = this.predict(strippedOfClassArr);

  var actualClassArr = [];

  arrayToScore.forEach(function (vector) {
    actualClassArr.push(vector[1]);
  })

  for (var i = 0; i < actualClassArr.length; i ++) {
    if (actualClassArr[i] === predictedClassArr[i]) {
      counter ++;
    }
  }

  return counter/actualClassArr.length;

};

module.exports = KNN;
