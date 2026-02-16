const expenseManager = {
  records: [],
  currentId: 0,

  isValidExpense(name, value, type) {
    if (!name || typeof name !== "string") {
      console.error("Ошибка: укажите название траты");
      return false;
    }
    if (typeof value !== "number" || value <= 0) {
      console.error("Ошибка: сумма должна быть больше нуля");
      return false;
    }
    if (!type || typeof type !== "string") {
      console.error("Ошибка: выберите категорию");
      return false;
    }
    return true;
  },

  addRecord(name, value, type) {
    if (!this.isValidExpense(name, value, type)) return;

    const newRecord = {
      id: ++this.currentId,
      title: name,
      amount: value,
      category: type
    };

    this.records.push(newRecord);
    console.log(`Записано: ${name} — ${value}₽ (${type})`);
  },

  showAllRecords() {
    if (this.records.length === 0) {
      console.log("Пока нет записей");
      return;
    }

    console.log("\nМОИ ТРАТЫ:");
    this.records.forEach(record => {
      console.log(
        `  ${record.id}. ${record.title} — ${record.amount}₽ [${record.category}]`
      );
    });
  },

  calculateTotal() {
    const totalSum = this.records.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    console.log("\nПОЛНЫЙ ОТЧЁТ:");
    this.records.forEach(record => {
      console.log(`  • ${record.title}: ${record.amount}₽`);
    });
    console.log("ВСЕГО ПОТРАЧЕНО:", totalSum, "₽");

    return totalSum;
  },

  filterByCategory(categoryName) {
    const filteredRecords = this.records.filter(
      record => record.category === categoryName
    );

    const categoryTotal = filteredRecords.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    console.log(`\nКАТЕГОРИЯ: ${categoryName}`);
    filteredRecords.forEach(record => {
      console.log(`  • ${record.title}: ${record.amount}₽`);
    });
    console.log(`Итого по категории: ${categoryTotal}₽`);

    return filteredRecords;
  },

  searchByName(query) {
    const foundRecord = this.records.find(record =>
      record.title.toLowerCase().includes(query.toLowerCase())
    );

    if (foundRecord) {
      console.log("\nНАЙДЕНО:");
      console.log(`  ${foundRecord.id}. ${foundRecord.title} — ${foundRecord.amount}₽ (${foundRecord.category})`);
      return foundRecord;
    }

    console.log("\nНичего не найдено");
    return null;
  },

  deleteRecord(recordId) {
    const recordIndex = this.records.findIndex(record => record.id === recordId);

    if (recordIndex === -1) {
      console.error("Запись с таким ID не существует");
      return;
    }

    const deletedRecord = this.records.splice(recordIndex, 1)[0];
    console.log(`\nУдалено: ${deletedRecord.title} (${deletedRecord.amount}₽)`);
  },

  getStatisticsByCategory() {
    const statistics = this.records.reduce((acc, record) => {
      if (!acc[record.category]) {
        acc[record.category] = 0;
      }
      acc[record.category] += record.amount;
      return acc;
    }, {});

    console.log("\nСТАТИСТИКА ПО КАТЕГОРИЯМ:");
    
    const sortedCategories = Object.keys(statistics).sort();
    for (const category of sortedCategories) {
      console.log(`  ${category}: ${statistics[category]}₽`);
    }

    return statistics;
  }
};

// Демонстрация работы
console.log("ТРЕКЕР РАСХОДОВ ЗАПУЩЕН\n");

expenseManager.addRecord("Кофе", 250, "Еда");
expenseManager.addRecord("Обед", 600, "Еда");
expenseManager.addRecord("Такси", 800, "Транспорт");
expenseManager.addRecord("Подписка", 199, "Развлечения");

expenseManager.showAllRecords();
expenseManager.calculateTotal();
expenseManager.filterByCategory("Еда");
expenseManager.searchByName("такси");
expenseManager.deleteRecord(2);
expenseManager.getStatisticsByCategory();
expenseManager.showAllRecords();