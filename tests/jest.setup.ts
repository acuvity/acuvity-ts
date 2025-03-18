module.exports = async () => {
  const platform = process.argv
    .find((arg) => arg.startsWith("platform="))
    ?.split("=")[1];
  if (platform == undefined) {
    process.env["TEST_TOKEN"] = process.env["ACUVITY_TOKEN"];
  } else {
    if (platform === "dev") {
      process.env["TEST_TOKEN"] = process.env["APPS_DEV_TOKEN"];
    } else if (platform === "pre_prod") {
      process.env["TEST_TOKEN"] = process.env["APPS_PRE_PROD_TOKEN"];
    } else if (platform === "prod") {
      process.env["TEST_TOKEN"] = process.env["APPS_PROD_TOKEN"];
    } else {
      console.error(
        `Unknown platform ${platform} choose one from  ${["prod", "pre_prod", "dev"]}`,
      );
    }
  }
};
