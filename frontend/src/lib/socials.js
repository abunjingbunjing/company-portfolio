export function getSocialIcon(platform) {
  switch (platform) {
    case "linkedin":
      return "/images/socials/linkedin.svg";

    case "facebook":
      return "/images/socials/facebook.svg";

    case "github":
      return "/images/socials/github.svg";

    case "x":
      return "/images/socials/x.svg";

    case "instagram":
      return "/images/socials/instagram.svg";

    default:
      return "/images/socials/website.svg";
  }
}