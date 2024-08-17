const colors = {
  green: {
    v1: "#283618",
    v2: "#606C38",
  },

  beige: {
    v1: "#BC6C25",
    v2: "#DDA15E",
    v3: "#FEFAE0",
  },

  white: {
    v1: "#FFFFFF",
  },

  black: {
    v1: "#0E0E0E",
    v2: "#1C1C1C",
  },

  red: {
    v1: "#FF0000",
  },
};

export const palette = {
  header_background: colors.black.v1,
  header_link_color: colors.beige.v3,
  header_link_background: colors.green.v1,

  table_title_color: colors.white.v1,
  table_background_color: colors.green.v2,

  form_background: colors.white.v1,
  form_title_color: colors.green.v2,
  form_text_color: colors.green.v2,
  form_button_color: colors.white.v1,
  form_button_background: colors.green.v2,
  form_error: colors.red.v1,

  footer_background: colors.black.v2,
  footer_title_color: colors.beige.v2,
  footer_text_color: colors.beige.v3,
  footer_icon: colors.beige.v3,
};
