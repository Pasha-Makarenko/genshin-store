/** @type {{plugins: ((string|[string,{features: {"custom-properties": boolean}, stage: number, autoprefixer: {flexbox: string}}])[]|*[])}} */
const config = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          "postcss-flexbugs-fixes",
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
              features: {
                "custom-properties": false,
              },
            },
          ],
        ]
      : [
          // No transformations in development
        ],
}

export default config
