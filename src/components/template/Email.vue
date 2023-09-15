<script setup>
  import { ref, reactive, computed } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import {required, email} from '@vuelidate/validators';
  import { supabase } from '../../lib/supabaseClient'; 

  
  const errorMessage = ref('');
  const hasError = ref(false);
  const loading = ref(true)
  const formData = reactive({
    emailAddress: ''
  });
  const success = ref(false);

  const rules = computed(() => {
    return {
      emailAddress: { required, email },
    }
  })

  const v$ = useVuelidate(rules, formData)

  async function updateList() {
    const result = await v$.value.$validate();
    if(result) {
      try {
            const { error } = await supabase
              .from('PreLaunchList')
              .insert(
                { email_address: `${formData.emailAddress}` },
              )

        if(error) throw error;

      } catch(error) {
        console.log(error.message)
      } finally {
        loading.value = false;
      }
      success.value = true;
    }
    else {
      errorMessage.value = 'See the error(s) above and fix before submitting'
      hasError.value = true;
    }
    
  }
</script>


<template>
  <Transition>
    <div v-if="success">
      Thank for joining us. We'll keep you posted on updates when we launch.
    </div>
  </Transition>
    
    <div v-if="!success" id="list-form" class="form" action="">
        <label for="email">Enter your email to stay in the know.</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          v-model.trim="formData.emailAddress"
          @keyup.enter="updateList" 
          placeholder="Your email"
          :class="{error: hasError}" />
          <p v-for="error of v$.emailAddress.$errors" :key="error.$uid" class="error">
            <span>{{ error.$message }}</span>
           </p>
        <button type="submit" @click="updateList">Join Us</button>
        <p>{{ errorMessage }}</p>
    </div>
</template>


<style scoped lang="scss">
@import '/src/assets/css/_global.scss';

 .form {
    display: flex;
    flex-direction: column;
    width: 40%;
  }

  @media screen and (max-width: 800px) {
    .form {
      width: 80%;
    }
  }
  
  label {
    margin-bottom: $space-8;
  }

  input.error {
    border: 1px solid $brand-red;

    &:focus {
      border-color: $brand-red;
    }
  }

  p.error {
    font-weight: bold;
    font-size: .875em;
    color: $brand-red;
  }

  button {
    @include primary-button;
    margin-top: $space-16;
  }

  .v-enter-active {
    transition: opacity 1.5s ease;
  }
  .v-enter-from {
    opacity: 0;
  }
</style>