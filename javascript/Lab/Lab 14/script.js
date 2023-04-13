let date = [];
let cases = [];

async function getData() {
  let respond = await fetch("https://disease.sh/v3/covid-19/nyt/usa");
  let data = await respond.json();

  return data;
}

async function drawChart() {
  let data = await getData();

  for (const item of data) {
    if (item.date == "2023-01-01") {
      break;
    }
    date.push(item.date);
    cases.push(item.cases);
  }
  console.log("cases:", cases);

  bb.generate({
    data: {
      x: "x",
      columns: [
        ["x", ...date],
        ["cases", ...cases],
      ],
      type: "line", // for ESM specify as: bar()
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          count: 152,
          format: "%Y-%m-%d",
        },
      },
    },
    bindto: "#covid-weekly-us-cases",
  });

  bb.generate({
    data: {
      x: "x",
      columns: [
        ["x", ...date],
        ["cases", ...cases],
      ],
      type: "line", // for ESM specify as: bar()
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          count: 12,
          format: "%Y-%m-%d",
        },
      },
    },
    bindto: "#covid-2022-us-cases",
  });
}

drawChart();
