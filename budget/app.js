var BudgetController = (function () {
  var Expense = function (id, descr, value) {
    this.id = id;
    this.type = 'exp';
    this.description = descr;
    this.value = value;
  }

  var Income = function (id, descr, value) {
    this.id = id;
    this.type = 'inc';
    this.description = descr;
    this.value = value;
  }

  var id = 0;

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: null,
  }

  var updateBudget = function () {
    data.budget = data.totals.inc - data.totals.exp;
    if (data.budget > 0) {
      data.percentage = data.totals.exp/data.totals.inc;
    } else {
      data.percentage = null;
    }
  }

  return {
      addItem: function (type, description, value) {

        if (type === 'exp'){
          newItem = new Expense(id, description, value);

        } else {
          newItem = new Income(id, description, value);
        }
        id += 1;

        data.allItems[type].push(newItem);
        data.totals[type] += newItem.value;
        updateBudget();

        return newItem;
      },

      getBudget: function () {
        return {
          budget: data.budget,
          income: data.totals.inc,
          expenses: data.totals.exp,
          percentage: data.percentage,
        }
      },

      test: function (){
        console.log(data);
      }
  }
})();

var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    expensesList: '.expenses__list',
    incomeList: '.income__list',
    addBtn: '.add__btn',
    budgetValue: '.budget__value',
    incomeTotal: '.budget__income--value',
    expensesTotal: '.budget__expenses--value',
    percentageTotal: '.budget__expenses--percentage',
  }

  return {
      getDOMstrings: function () {
        return DOMstrings;
      },

      getInput: function (){
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
        }
      },

      clearFields: function() {
        var fields;
        fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

        fields.forEach(function (field){
          field.value = '';
        });

        fields[0].focus();
      },

      displayItem: function (item) {
        var html, component;
        if (item.type === 'exp'){
          component = document.querySelector(DOMstrings.expensesList);
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else {
          component = document.querySelector(DOMstrings.incomeList);
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        html = html.replace('%id%', item.id);
        html = html.replace('%description%', item.description);
        html = html.replace('%value%', item.value);
        component.insertAdjacentHTML('beforeend', html);
      },

      displayBudget: function (obj) {
        var perc = obj.percentage === null? '---' : obj.percentage + '%';
        document.querySelector(DOMstrings.budgetValue).textContent = obj.budget;
        document.querySelector(DOMstrings.incomeTotal).textContent = obj.income;
        document.querySelector(DOMstrings.expensesTotal).textContent = obj.expenses;
        document.querySelector(DOMstrings.percentageTotal).textContent = perc;
      }
  }
})();

var AppController = (function (UICtrl, BudgetCtrl) {

  var DOM = UICtrl.getDOMstrings();

  var addItemHandler = function () {
    var data, newItem, budget;
    // 1. Get user input
    data = UICtrl.getInput();
    // 2. Save data
    newItem = BudgetCtrl.addItem(data.type, data.description, data.value);
    // 3. Display added item in UI
    UICtrl.displayItem(newItem);
    //4. Clear input
    UICtrl.clearFields();
    // 5. Update total budget
    budget = BudgetCtrl.getBudget();
    UICtrl.displayBudget(budget);
  }

return {
  run: function () {
    UICtrl.displayBudget({budget:0, income:0, expenses:0, percentage: null});
    document.querySelector(DOM.addBtn).addEventListener('click', addItemHandler);
    document.addEventListener('keypress', function () {
      if (event.keyCode === 13) {
        addItemHandler();
      }
    });
  }
}


})(UIController, BudgetController);


AppController.run();
