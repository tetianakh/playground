(function (){
  var Question = function (question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.ask = function () {
      console.log(this.question);
      for (var i = 0; i < this.answers.length; i++) {
        console.log('(' + i + ')  ' + this.answers[i]);
      }
    }

    this.isCorrect = function(answer) {
      if (answer == this.correctAnswer) {
        console.log("Correct!");
        return true;
      } else {
        console.log("Incorrect!");
        return false;
      }
    }
  }


var makeGame = function (){
  var q1 = new Question("Who's on duty today?", ['nobody', 'jakas foka', 'dexterek'], 2);
  var q2 = new Question("What's up?", ['Not much', 'Nothing', 'Whatev'], 0);
  var score = 0;
  var questions = [q1, q2];

  return function () {
    var idx = Math.floor(Math.random()*2);
    questions[idx].ask();
    var answer = prompt("Enter your answer:");
    if (answer === 'exit') {
      return false;
    }
    if (questions[idx].isCorrect(answer)){
      score += 1;
    };
    console.log('Your score: ' + score);
    return true;
  }
}

var game = makeGame()

var play = true;
while (play) {
  play = game();
}
console.log("Bye!")
})();
