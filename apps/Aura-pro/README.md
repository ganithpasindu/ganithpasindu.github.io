# Aura Pro — Ambient Light & PC App

**Aura Pro** is a screen-reactive ambient lighting system for Windows powered by an **ESP32** controller and **FastLED**, paired with a desktop companion app (`Aura_pro_Setup.exe`) and a browser-based **ESP32 Web Serial** installer.

---

## Key Features

- **Browser ESP32 Web Installer:** Flash ESP32 firmware directly from Chrome, Edge, or Opera via Web Serial without extra flashing tools.
- **Easy Wi-Fi & Pin Setup:** AP mode (`Aura Pro`) with Wi-Fi scanning, password entry, and selectable WS2812B data GPIO pin.
- **20 FPS Screen Capture & Streaming:** Real-time screen sampling and smooth UDP/Adalight color streaming to the ESP32.
- **Per-LED Position Calibration & White Tuning:** Adjust individual LED positions, brightness, gamma, white balance (`R / G / B`), and auto-start behavior.
- **OTA & App Updates:** Supports over-the-air ESP32 firmware updates and desktop app release checks via GitHub Releases.

---

## Installation

### 1. Flash ESP32 Firmware (Browser Web Serial)
1. Connect your **ESP32** board to your computer via USB (install **CP2102** or **CH340** drivers if the serial port does not appear).
2. Open the **Aura Pro** card on the website and click **Flash ESP32**.
3. Click **Connect & Flash ESP32**, choose your COM port, and wait until flashing completes.

### 2. Install Windows Desktop App
1. Download **`Aura_pro_Setup.exe`** from the **PC (.exe)** button or GitHub Releases.
2. Run the installer and launch **Aura Pro** (Windows 10 / 11, 64-bit).

---

## Initial Setup Guide

1. **Connect to ESP32 AP:** If the ESP32 is not yet configured, connect your PC/device to Wi-Fi **`Aura Pro`** using password **`Aura1234`**.
2. **Configure Wi-Fi & LED Pin:** Open **Aura Pro**, scan or enter your home Wi-Fi SSID & password, choose your WS2812B GPIO data pin, and save to reboot.
3. **Reconnect & Calibrate:** Reconnect your PC to your home Wi-Fi, configure your LED layout (Top / Bottom / Left / Right, start corner, and direction), run **Position Calibration** and **Tuning & Auto-Start**, then click **Start**.

> **Factory Reset:** Hold the ESP32 **BOOT** button (`GPIO 0`) for ~3 seconds (magenta LED indicator) or use **Reset** in the app to clear saved Wi-Fi/settings and return to AP setup mode.

---

## Project Links

- **GitHub Repository:** https://github.com/GanithPasindu/Aura-pro
- **Developer Website:** https://ganithpasindu.github.io/
