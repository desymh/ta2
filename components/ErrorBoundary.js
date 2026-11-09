import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    console.error("[ErrorBoundary] Caught error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Terjadi Kesalahan</Text>
          <Text style={styles.message}>{this.state.error?.message || "Unknown error"}</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.setState({ hasError: false, error: null })}>
            <Text style={styles.buttonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#f5f7fa" },
  title: { fontSize: 18, fontWeight: "bold", color: "#c0392b", marginBottom: 8 },
  message: { fontSize: 14, color: "#6b7a8d", textAlign: "center", marginBottom: 16 },
  button: { backgroundColor: "#2c3e50", borderRadius: 8, padding: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
});
