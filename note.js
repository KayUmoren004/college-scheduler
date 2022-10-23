// const LabComp = ({ course }) => {
//   return (
//     <View>
//       <Text
//         style={{
//           color: "#fff",
//         }}
//       >
//         {course.courseInformation.courseTitle}
//       </Text>
//     </View>
//   );
// };

// const filterByValue = (array, value) =>
//   // array.filter((el) => {
//   //   const objValues = Object.values(el).flat();
//   //   // console.log(objValues);
//   //   const elementsValues = objValues.map((v) => Object.values(v)).flat();
//   //   // console.log(elementsValues);
//   //   const finalFlat = elementsValues.some((v) =>
//   //     v.toString().includes(value)
//   //   );

//   //   return finalFlat.some((v) => v.toString().includes(value));
//   // }
//   // Filter array then flatten until there are no more objects then log output
//   array.filter((el) => {

//   );

// useEffect(() => {
//  // console.log(filterByValue(lab, "Thursday"));
//   // Loop through lab and store to actualLab
//   // console.log(lab);
//   // for (const child in lab) {
//   //   console.log(child);
//   //   // setActualLab(lab[child]);
//   //   // console.log(lab[child], `lab${child}`);
//   //   //console.log(obj, "obj");
//   //   // if (Object.values(lab[child].lab.labDays).includes("Thursday")) {
//   //   //   // Add all results into a single object
//   //   //  for (let i = 0; i)
//   //   //   // setLabThursday({
//   //   //   //   ...labThursday,
//   //   //   //   [child]: lab[child],
//   //   //   // });
//   //   //   //  console.log(lab[child], `lab${child}`);
//   //   //   // setLabThursday({
//   //   //   //   ...,
//   //   //   //   child: lab[child],
//   //   //   // });
//   //   //   // console.log(lab[child], `lab${child}`);
//   //   //   // console.log(lab[child]);
//   //   //   // lab[child].map((course, idx) => {
//   //   //   //   return <LabComp course={course} key={idx} />;
//   //   //   // });
//   //   // }
//   //   // // Filter for lab[child].lab.labDays.includes("Thursday") and store child to labThursday
//   //   // if (Object.values(lab[child].lab.labDays).includes("Thursday")) {
//   //   //   setLabThursday({
//   //   //     ...labThursday,
//   //   //     [child]: lab[child],
//   //   //   });
//   //   // }
//   // }
//   // let obj = {};
//   // lab.filter((el) => {
//   //   const objValues = Object.values(el).flat();
//   //   // console.log(objValues);
//   //   const elementsValues = objValues.map((v) => Object.values(v)).flat();
//   //   // console.log(elementsValues);
//   //   const finalFlat = elementsValues.map((v) => Object.values(v)).flat();
//   //   // console.log(finalFlat);
//   //   // console.log(finalFlat.some((v) => v.toString().includes("Thursday")));
//   // });
// }, [lab]);

// console.log(labThursday, "labThursday");

// TODO: Fix issue of only one lab being displayed

// console.log(Object.values(labThursday));

setPasses(
  data.sort((a, b) => {
    if (a.passDate === b.passDate) {
      return (
        Date.parse(
          "1970/01/01 " +
            b.signInTime.slice(0, -2) +
            " " +
            b.signInTime.slice(-2)
        ) -
        Date.parse(
          "1970/01/01 " +
            a.signInTime.slice(0, -2) +
            " " +
            a.signInTime.slice(-2)
        )
      );
    }
    return b.passDate > a.passDate ? 1 : -1
  })
);
