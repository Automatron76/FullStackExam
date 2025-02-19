export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About City Point of Interests",
        };
        return h.view("about-view", viewData);
      },
    },
  };
  