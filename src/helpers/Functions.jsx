const Functions = {
  // Get Current Date
  getCurrentDate: () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return month + "-" + date + "-" + year;
  },
};

export default Functions;
