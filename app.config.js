export default {
    expo: {
        name: "segunda",
        slug: "segunda",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            googleServicesFile:
                process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
            package: "com.dioskor0.segunda",
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                },
            ],
            [
                "expo-image-picker",
                {
                    photosPermission:
                        "Allow $(PRODUCT_NAME) to access your photos",
                },
            ],
            "@react-native-firebase/app",
            "@react-native-firebase/auth",
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: "0f7f8ef2-5949-474a-9a3b-c2a5c8b6503c",
            },
        },
        owner: "segunda",
    },
};
