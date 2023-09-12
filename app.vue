<script setup lang="ts"></script>

<template>
  <Html lang="en">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body class="p-4 bg-kavli-blue">
      <AppHeader />

      <main class="main">
        <NuxtPage />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>
