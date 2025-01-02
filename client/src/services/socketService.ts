import { io } from 'socket.io-client';
import { useImageStore } from '@/stores/ImageStore';
import { useAnnotationStore } from '@/stores/annotationStore';

const socket = io('http://localhost:3000');

const imageStore = useImageStore();
const annotationStore = useAnnotationStore();

socket.on('connect', () => {
  console.log(`Connected with id: ${socket.id}`);
});

socket.on('initialize', (canvasState) => {
  console.log('canvas initial state:', canvasState);
  imageStore.images = canvasState.images;
  annotationStore.annotations = canvasState.annotations;
});

socket.on('updateBackgroundColor', (color) => {
  console.log('Background color updated:', color);
});

socket.on('updateImages', (images) => {
  console.log('Images updated:', images);
  imageStore.images = images;
});

socket.on('updateAnnotations', (annotations) => {
  console.log('Annotations updated:', annotations);
  annotationStore.annotations = annotations;
});

export default socket;