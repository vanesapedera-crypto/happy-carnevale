/** Maigās apļu krāsas aiz kostīmu bildēm (atkārtojas pa kārtai). */
export const CIRCLE_COLORS = [
  "linear-gradient(160deg, #FFE98A 0%, #FFF6CC 100%)",
  "linear-gradient(160deg, #EED9BF 0%, #FBF1E4 100%)",
  "linear-gradient(160deg, #FFC4E1 0%, #FFEAF4 100%)",
  "linear-gradient(160deg, #BFE8FD 0%, #E9F7FF 100%)",
  "linear-gradient(160deg, #B5F7E6 0%, #E7FDF7 100%)",
  "linear-gradient(160deg, #DCCFFF 0%, #F3EEFF 100%)",
  "linear-gradient(160deg, #FFCFC2 0%, #FFF0EB 100%)",
  "linear-gradient(160deg, #C9DEFF 0%, #EEF4FF 100%)",
];

export const circleColor = (index: number) => CIRCLE_COLORS[index % CIRCLE_COLORS.length];
