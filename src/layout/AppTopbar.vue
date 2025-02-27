<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32 4C18.74 4 8 14.74 8 28C8 41.26 18.74 52 32 52C45.26 52 56 41.26 56 28C56 14.74 45.26 4 32 4ZM32 8C44.15 8 54 17.85 54 30C54 42.15 44.15 52 32 52C19.85 52 10 42.15 10 30C10 17.85 19.85 8 32 8ZM32 12C24.27 12 18 18.27 18 26C18 33.73 24.27 40 32 40C39.73 40 46 33.73 46 26C46 18.27 39.73 12 32 12ZM32 16C38.62 16 44 21.38 44 28C44 34.62 38.62 40 32 40C25.38 40 20 34.62 20 28C20 21.38 25.38 16 32 16ZM32 20C27.58 20 24 23.58 24 28C24 32.42 27.58 36 32 36C36.42 36 40 32.42 40 28C40 23.58 36.42 20 32 20ZM32 24C34.21 24 36 25.79 36 28C36 30.21 34.21 32 32 32C29.79 32 28 30.21 28 28C28 25.79 29.79 24 32 24Z"
                        fill="var(--primary-color)" />
                </svg>
                <span>IRFuzz</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button" class="layout-topbar-action layout-topbar-action-highlight">
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
