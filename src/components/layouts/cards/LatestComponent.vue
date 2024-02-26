<template>
    <div v-if="isLoading">
      Loading...
    </div>
    <div class="row" v-else-if="latestDocs">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" v-for="user in latestDocs" :key="user.id">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 font-weight-bold">{{ user.email }}</p>
                  <h5 class="font-weight-bolder">{{ user.name }}</h5>
                  <p class="mb-0">
                    <span v-for="role in user.role" :key="role.id" class="text-success text-sm font-weight-bolder">
                      {{ role }}
                    </span>
                    {{ getFormattedDate(user.created_at) }}
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                  <img :src="user.profile" class="rounded-circle icon icon-shape" style="width: 50px; height: 50px;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        There is no Doctors Added
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  import moment from 'moment';
import 'moment-timezone';
  
  export default {
    data() {
      return {
        latestDocs: [],
        isLoading: true,
      };
    },
    created() {
      this.fetchLatestDocs();
    },
    methods: {
      getFormattedDate(date) {
      return moment(date).fromNow(); // Uses relative time formatting
    },
      async fetchLatestDocs() {
        try {
          const response = await api.get('/admin/dashboard');
          console.log('API response:', response.data.users);
          this.latestDocs = response.data.users.map(user => {
            console.log('User:', user);
            return {
              ...user,
              role: user.role.map(role => role.name),
            };
          });
          this.isLoading = false;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  </style>
  