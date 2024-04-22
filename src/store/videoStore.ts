import create from 'zustand';

interface VideoUrlStoreState {
  videoUrls: string[];
  loading: boolean;
  setVideoUrls: (videoUrls: string[]) => void;
  setLoading: (loading: boolean) => void;
}

const useVideoUrlStore = create<VideoUrlStoreState>((set) => ({
  videoUrls: [],
  loading: true,
  setVideoUrls: (videoUrls) => {
    localStorage.setItem('videoUrls', JSON.stringify(videoUrls));
    set({ videoUrls });
  },
  setLoading: (loading) => set({ loading }),
}));

export default useVideoUrlStore;
