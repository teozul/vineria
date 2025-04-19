<template>
  <header class="app-header">
    <div class="container header-container">
      <div class="logo">
        <router-link to="/">
          <h1>Wine Tasting</h1>
        </router-link>
      </div>
      <nav class="main-nav">
        <ul>
          <li>
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li>
            <router-link to="/create" class="nav-link">New Tasting</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  background-color: #722f37;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: center;
  }

  .logo {
    margin-bottom: 1rem;
  }

  .main-nav ul {
    flex-direction: column;
    text-align: center;
  }

  .nav-link {
    display: block;
    margin-bottom: 0.5rem;
    margin-left: 0;
  }
}
</style>