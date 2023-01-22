<template>
  <div>
    <AppSidebar>
      <AppBrand>Bi.Stable</AppBrand>

      <AppNav>
        <AppNavItem to="/dashboard">
          <BaseIcon name="material-symbols:space-dashboard-rounded" />
        </AppNavItem>
        <AppNavItem to="/medicines">
          <BaseIcon name="game-icons:medicines" />
        </AppNavItem>
        <AppNavItem to="/calendar">
          <BaseIcon name="material-symbols:calendar-month" />
        </AppNavItem>
        <AppNavItem to="/settings">
          <BaseIcon name="material-symbols:settings" />
        </AppNavItem>
      </AppNav>
    </AppSidebar>

    <AppWrapper>
      <AppHeader/>
      <AppContent>
        <slot/>
      </AppContent>
    </AppWrapper>
  </div>
</template>

<script setup>


</script>

<style scoped>

</style>
