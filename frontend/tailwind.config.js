module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {

        extend: {
            backgroundImage: {
                main: "linear-gradient(113deg, #53D2FA 0.66%, #53A0FA 20.35%, rgba(136, 83, 250, 0.76) 39.74%, rgba(201, 120, 250, 0.91) 64.14%, rgba(248, 150, 250, 0.90) 82.39%, rgba(247, 83, 250, 0.56) 100%)",
                violet: "linear-gradient(122deg, #8D8BFF -7.3%, #B282FF 116.26%)",
            },
            animation: {
                fadeIn: "fadeIn 0.3s linear",
                fadeOut: "fadeOut 0.3s linear",
                imgFade: "fadeIn 0.15s ease-in-out",
                popUpIn: "popUp 0.15s linear",
                popUpOut: "popUpOut 0.2s linear",
            },
            colors: {
                black: "#000",
                blue: "#6BA6FF",
                blueHover: "#448FFF",
                blueMainHover: "#5297FF",
                purple: "#6046FF",
                lightBlue: "rgba(107, 166, 255, 0.29)"
            },
            backgroundColor: {
                modalInset: "rgba(90, 101, 121, 0.34)",
                white: "#FEFEFE",
                lightViolet: "rgba(166, 164, 248, 0.57)",
                paleBlue: "rgba(164, 198, 248, 0.57)"
            },
            boxShadow: {
                tableRow: "0px 2px 3.7px 0px rgba(0, 0, 0, 0.25)",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "100" },
                },
                fadeOut: {
                    "0%": { opacity: "100" },
                    "100%": { opacity: "0" },
                },
                popUpOut: {
                    "0%": { scale: "100%", bottom: "0" },
                    "100%": { scale: "70%", bottom: "-50px" },
                },
                popUp: {
                    "0%": { scale: "90%", bottom: "-50px" },
                    "100%": { scale: "100%", bottom: "0" },
                },
            },
        },
    },
    plugins: [],
}