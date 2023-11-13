<script setup lang="ts"></script>

<template>
  <Html lang="en">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body
      class="antialiased text-black xl:text-md 2xl:text-lg 3xl:text-xl font-sans bg-kavli-bg"
    >
      <div class="flex flex-col min-h-screen">
        <AppHeader />

        <div class="relative flex-1">
          <main class="main">
            <NuxtPage />
          </main>
        </div>

        <AppFooter />
      </div>

      <AppLoadingState />
    </Body>
  </Html>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 350ms ease-in-out,
    transform 450ms ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(2px);
}
.page-leave-to {
  opacity: 0;
}
</style>
