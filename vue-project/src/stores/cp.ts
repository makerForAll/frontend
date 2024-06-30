import { defineStore } from 'pinia';

export const useCPStore = defineStore('cp',{
  state: () => ({
    isOpen: false,
    currentRecord: null
  }),
  actions: {
    openDrawer() {
      this.isOpen = true;
    //   this.currentRecord = record;
    },
    closeDrawer() {
      this.isOpen = false;
    //   this.currentRecord = null;
    }
  }
});
