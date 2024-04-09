const mapApiConditionToType = (apiCondition) => {
  switch (apiCondition) {
    case "Clear":
      return "sunny";
    case "Clouds":
      return "cloudy";
    case "Rain":
    case "Drizzle":
      return "riany";
    case "Thunderstorm":
    case "Tornado":
      return "stormy";
    case "Snow":
      return "snowy";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
      return "foggy";
    default:
      return "sunny";
  }
};

export default mapApiConditionToType;
