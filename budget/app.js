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
    data.percentage = calculatePercentage(data.totals.exp);
  }

  var calculatePercentage = function (expense) {
    if (data.totals.inc > 0) {
      return Math.round(expense/data.totals.inc * 100);
    }
    return null;
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

      deleteItem: function (type, id) {
        var ids = data.allItems[type].map(function (elem) {
          return elem.id;
        });
        var idx = ids.indexOf(id);
        if (idx !== -1){
          data.totals[type] -= data.allItems[type][idx].value;
          data.allItems[type].splice(idx, 1);
          updateBudget();
        }
      },

      getBudget: function () {
        return {
          budget: data.budget,
          income: data.totals.inc,
          expenses: data.totals.exp,
          percentage: data.percentage,
        }
      },

      getPercentages: function () {
        return data.allItems.exp.map(function(elem) {
          return calculatePercentage(elem.value);
        })
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
    container: '.container',
    itemPercentage: '.item__percentage',
    date: '.budget__title--month',
  }

  var getPercentageLabel = function (percentage) {
    return percentage === null ? '---' : percentage + '%';
  }

  var formatNumber = function (type, value) {
    var numSplit, int, dec;
    sign = type === 'inc' ? '+' : '-';
    value = value.toFixed(2);
    numSplit = value.split('.');
    int = numSplit[0];
    dec = numSplit[1];
    if (int.length > 3) {
      int = int.substr(0, int.length-3) + ',' + int.substr(int.length - 3, int.length);
    }
    return sign + ' ' + int + '.' + dec;
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", 'Sept', 'Oct', 'Nov', 'Dec'];

  return {
      displayDate: function () {
        var now;
        now = new Date();
        now = months[now.getMonth()] + ' ' + now.getFullYear();
        document.querySelector(DOMstrings.date).textContent = now;
      },

      changeColor: function () {
        var fields = document.querySelectorAll(
          DOMstrings.inputType + ',' +
          DOMstrings.inputDescription + ',' +
          DOMstrings.inputValue
        );
        fields.forEach(function(elem){
          elem.classList.toggle('red-focus')
        });
        var btn = document.querySelector(DOMstrings.addBtn).classList.toggle('red')
      },

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
          html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else {
          component = document.querySelector(DOMstrings.incomeList);
          html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        html = html.replace('%id%', item.id);
        html = html.replace('%description%', item.description);
        html = html.replace('%value%', formatNumber(item.type, item.value));
        component.insertAdjacentHTML('beforeend', html);
      },

      deleteItem: function (itemId) {
        var elem = document.getElementById(itemId);
        elem.parentNode.removeChild(elem);
      },

      displayBudget: function (obj) {
        var perc = getPercentageLabel(obj.percentage);
        var type = obj.budget < 0? 'exp': 'inc';
        document.querySelector(DOMstrings.budgetValue).textContent = formatNumber(type, obj.budget);
        document.querySelector(DOMstrings.incomeTotal).textContent = formatNumber('inc', obj.income);
        document.querySelector(DOMstrings.expensesTotal).textContent = formatNumber('exp', obj.expenses);
        document.querySelector(DOMstrings.percentageTotal).textContent = perc;
      },

      displayPercentages: function (percentages) {
        var list = document.querySelectorAll(DOMstrings.itemPercentage);
        list.forEach(function(node, i){
          node.textContent = getPercentageLabel(percentages[i]);
        })
      }
  }
})();

var AppController = (function (UICtrl, BudgetCtrl) {


  var updateBudget = function (){
    var budget = BudgetCtrl.getBudget();
    UICtrl.displayBudget(budget);
  }

  var updatePercentages = function () {
    var percentages = BudgetCtrl.getPercentages();
    UICtrl.displayPercentages(percentages);
  }

  var addItemHandler = function () {
    var data, newItem, budget;
    // 1. Get user input
    data = UICtrl.getInput();
    if (data.description !== '' && data.value > 0) {
      // 2. Save data
      newItem = BudgetCtrl.addItem(data.type, data.description, data.value);
      // 3. Display added item in UI
      UICtrl.displayItem(newItem);
      //4. Clear input
      UICtrl.clearFields();
      // 5. Update total budget
      updateBudget();
      updatePercentages();
    }

  }

  var removeItemHandler = function (event) {
    var itemId, splitId, type, id;
    // 1. Get list element ID
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      splitId = itemId.split('-');
      type = splitId[0];
      id = parseInt(splitId[1]);
      BudgetCtrl.deleteItem(type, id);
      UICtrl.deleteItem(itemId);
      updateBudget();
      updatePercentages();
    }


    // 2. Delete element from internal data structure
    // 3. Delete element from UI
    // 4. Update budget
  }

return {
  run: function () {
    UICtrl.displayBudget({budget:0, income:0, expenses:0, percentage: null});
    UICtrl.displayDate();

    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener('click', addItemHandler);

    document.addEventListener('keypress', function () {
      if (event.keyCode === 13) {
        addItemHandler();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', removeItemHandler);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeColor);
  }
}


})(UIController, BudgetController);


AppController.run();
