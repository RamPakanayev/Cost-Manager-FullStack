// This file contains all the functions that handle the local storage operations
import moment from "moment";
const LOCAL_STORAGE_KEY = "cost_items";

class LocalStorageLibrary {
  // function to add a new cost item to the local storage
  static async addCostItem(costItem) {
    try {
      let costItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      costItems.push(costItem);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(costItems));
    } catch (error) {
      throw error;
    }
  }

  // function to get all the cost items from the local storage
  static async getCostItems() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    } catch (error) {
      throw error;
    }
  }
    // function to get the report data based on the selected month and year
    static async getReport(month, year) {
      try {
          const costItems = await this.getCostItems();
          const filteredItems = costItems.filter((item) => {
              // filtering the items based on the selected month and year
              const itemDate = moment(item.date);
              return itemDate.month() === month - 1 && itemDate.year() === year;
          });
          return filteredItems;
      } catch (error) {
          throw error;
      }
  }
}

export default LocalStorageLibrary;
