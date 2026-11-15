<template>
  <form class="product-review-form" @submit.prevent="onSubmit()">
    <h3 class="product-review-form__title">Add a Review</h3>
    <p class="product-review-form__hint">
      Your Email Address Will Not Be Published. Required Fields Are Marked *
    </p>

    <p
      v-if="isSignedIn"
      class="product-review-form__signed-in"
      role="status"
    >
      You are signed in as
      <strong>{{ displayName }}</strong>
      . This review will be posted under your account name.
    </p>

    <UiBaseUnderlineField
      id="product-review-body"
      v-model="body"
      label="Your Review*"
      multiline
      :rows="5"
    />

    <template v-if="!isSignedIn">
      <UiBaseUnderlineField
        id="product-review-name"
        v-model="name"
        label="Enter your name*"
        autocomplete="name"
      />

      <UiBaseUnderlineField
        id="product-review-email"
        v-model="email"
        label="Enter your Email*"
        type="email"
        autocomplete="email"
      />

      <label class="product-review-form__checkbox">
        <input v-model="saveInBrowser" type="checkbox" class="product-review-form__checkbox-input" />
        <span>
          Save my name, email, and website in this browser for the next time I comment.
        </span>
      </label>
    </template>

    <div class="product-review-form__rating">
      <span class="product-review-form__rating-label">Your Rating*</span>
      <ProductReviewStars v-model:rating="rating" interactive size="md" />
    </div>

    <UiBaseButton type="submit" variant="solid-black" class="product-review-form__submit">
      Submit
    </UiBaseButton>
  </form>
</template>

<script setup lang="ts">
import ProductReviewStars from '~/components/product/ProductReviewStars.vue'

const emit = defineEmits<{
  submitted: []
}>()

const { isSignedIn, displayName, email: accountEmail } = useAccountSession()

const body = ref('')
const name = ref('')
const email = ref('')
const saveInBrowser = ref(false)
const rating = ref(0)

function onSubmit() {
  const authorName = isSignedIn.value ? displayName.value.trim() : name.value.trim()
  const authorEmail = isSignedIn.value ? accountEmail.value.trim() : email.value.trim()

  if (!body.value.trim() || !authorName || !authorEmail || rating.value < 1) {
    useToastStore().show({ message: 'Please fill in all required fields.' })
    return
  }

  useToastStore().show({
    message: isSignedIn.value
      ? `Thank you, ${displayName.value}! Your review was submitted (demo).`
      : 'Thank you! Your review was submitted (demo).',
  })

  body.value = ''
  name.value = ''
  email.value = ''
  rating.value = 0
  saveInBrowser.value = false
  emit('submitted')
}
</script>

<style scoped lang="scss">
.product-review-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__hint {
    margin: -8px 0 4px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-muted);
  }

  &__signed-in {
    margin: 0 0 4px;
    padding: 12px 14px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-muted);
    background: var(--color-surface-muted);
    border-radius: var(--radius-sm);

    strong {
      color: var(--color-text);
      font-weight: 500;
    }
  }

  &__checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-muted);
    cursor: pointer;
  }

  &__checkbox-input {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    accent-color: var(--color-text);
  }

  &__rating {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__rating-label {
    font-size: 14px;
    color: var(--color-text-muted);
  }

  &__submit {
    margin-top: 4px;
  }
}
</style>