import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Màn hình Đăng nhập
const SignInScreen = ({ navigation }) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const validatePhoneNumber = (phone) => {
        const regex = /^(03|05|07|08|09)[0-9]{8}$/;
        return regex.test(phone);
    };

    const handlePhoneChange = (text) => {
        setPhone(text);
        setError(validatePhoneNumber(text) ? "" : "Số điện thoại không đúng định dạng.");
    };

    const handleContinue = () => {
        if (validatePhoneNumber(phone)) {
            navigation.replace("Home", { phone });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <Text style={styles.description}>
                Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
            </Text>

            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
                style={[styles.button, !validatePhoneNumber(phone) && styles.buttonDisabled]} 
                onPress={handleContinue}
                disabled={!validatePhoneNumber(phone)}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
};

// Màn hình Trang chủ
const HomeScreen = ({ route, navigation }) => {
    const { phone } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>🎉 Chào mừng!</Text>
            <Text style={styles.phoneText}>📞 Số điện thoại: {phone}</Text>

            <TouchableOpacity 
                style={styles.buttonLogout} 
                onPress={() => navigation.replace("SignIn")}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Đăng nhập" }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 14,
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: "gray",
    },
    buttonLogout: {
        backgroundColor: "#FF3B30",
        paddingVertical: 14,
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    phoneText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
});

export default App;
