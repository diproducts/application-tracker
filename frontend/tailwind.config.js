module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {

        extend: {
            backgroundImage: {
                main: "linear-gradient(113deg, #53D2FA 0.66%, #53A0FA 20.35%, rgba(136, 83, 250, 0.76) 39.74%, rgba(201, 120, 250, 0.91) 64.14%, rgba(248, 150, 250, 0.90) 82.39%, rgba(247, 83, 250, 0.56) 100%)",
            },
            animation: {
                fadeIn: "fadeIn 0.3s linear",
                fadeOut: "fadeOut 0.3s linear",
                imgFade: "fadeIn 0.15s ease-in-out",
                popUpIn: "popUp 1.5s linear",
                popUpOut: "popUpOut 0.2s linear",
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
                    "0%": { bottom: "-50px", opacity: "0" },
                    "100%": { bottom: "0", opacity: "1" },
                }
            },
        },
    },
    plugins: [],
}