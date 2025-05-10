<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ Labels.confirmDeletion }}</h2>
                <button class="modal-close" @click="onCancel">&times;</button>
            </div>
            <div class="modal-body">
                <p>
                    {{ Labels.confirmDeletionMessage }}
                    <strong>{{ item?.denomination }}</strong>
                    {{ Labels.by }}
                    <strong>{{ item?.producer }}</strong>?
                </p>
                <p class="warning-text">{{ Labels.confirmDeletionWarning }}</p>
                <div class="modal-actions">
                    <button @click="onCancel" class="btn btn-secondary">
                        {{ Labels.cancel }}
                    </button>
                    <button @click="onConfirm" class="btn btn-danger">
                        {{ Labels.delete }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Labels } from '@/helpers/Labels';
import { WineTastingSheet } from '@/models/WineTastingSheet';

const props = defineProps<{
    show: boolean;
    item: WineTastingSheet | null;
}>();

const emits = defineEmits<{
    cancel: [];
    confirm: [];
}>();

function onCancel() {
    emits('cancel');
}

function onConfirm() {
    emits('confirm');
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.modal-body {
    padding: 1.5rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
}

.warning-text {
    color: #721c24;
    background-color: #f8d7da;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}
</style> 