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

  // Filter Courses by Day
  filterByDay: (courses, day) => {
    courses.filter((element) => {
      const objValues = Object.values(element).flat();
      const elementsValues = objValues.map((v) => Object.values(v)).flat();
      return elementsValues.some((v) => v.includes(day));
    });
  },
};

export default Functions;
