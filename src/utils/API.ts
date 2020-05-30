import data from "../data";

export default {
  getSurveys: function () {
    return data.surveys.map((survey: any) => {
      return {
        id: survey.id,
        name: survey.name,
      };
    });
  },

  getSurvey: function (id: string | null) {
    return data.surveys.find((survey: any) => {
      return survey.id === id;
    });
  },
};
