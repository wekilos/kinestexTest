import React, { useEffect, useRef, useState } from 'react';
import useVideoUrlStore from './store/videoStore';
import { IndexType } from 'typescript';

const App: React.FC = () => {
  const [start, setStart] = useState<boolean>(false)
  const [indexOf, setIndex] = useState<number>(0)
  const videoUrls = useVideoUrlStore((state) => state.videoUrls);
  const cachedVideoUrls = localStorage.getItem('videoUrls');
  const [loading, setLoading] = useState<boolean>(true);
  const setVideoUrls = useVideoUrlStore((state) => state.setVideoUrls);

  const refVideo = useRef<HTMLVideoElement | null>(null);

  const [blobed, setBlobed] = useState<any[]>([])

  useEffect(() => {
    if (cachedVideoUrls) {
      setVideoUrls(JSON.parse(cachedVideoUrls));
    } else {
      // Fetch the video URLs from an API or any other source
      const fetchedVideoUrls = [
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FSpine%20Redress%2F1_2_180_Stretch.mp4?alt=media&token=6ba74914-9dea-40a6-82cc-8594fc675e6b",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FYoga%20for%20Mood%20Enhancement%2F8-Point_Salute.mp4?alt=media&token=4768e630-8c15-4c11-b021-54c149116750",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FReconstruction%20Of%20The%20Anterior%20Cruciate%20Ligament%2F8-12%20week%2FCruciate%20Ligaments%20Functional%20Period%20Part%201%2F8_90_Degrees_Leg_Span_With_Torniquet.mp4?alt=media&token=18c47eb0-db7d-476f-96b3-fa5d979e5d6b",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F3%20week%2FNormalization%20Of%20Knee%2F16_Air_Plane_Pose_new.mp4?alt=media&token=6db17551-a057-4e47-8321-3f69d99cc8bf",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FInfluencers%2FHafizowa%2FShoulder%20Strengthening%2F4_Air_Row_Hafizowa.mp4?alt=media&token=64a5391b-98e5-404b-8fab-42912cf304e4", "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FTotal%20Body%20Feel%20Great%20Workout%201%2F3_Alternating_Reverse_Lunges_Ilya.mp4?alt=media&token=d31b8b89-d76b-41fe-a54e-72874f4b4014",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FTotal%20Body%20Feel%20Great%20Workout%201%2F9_Alternating_Side_Lunge_Ilya.mp4?alt=media&token=ad46b213-e545-4ffa-9f8f-a3b22d5ab933",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F2%20week%2FBuilding%20Strength%20Of%20Knees%2F17_Antenna_Heels_new.mp4?alt=media&token=684d1769-7884-47b3-8709-e185a5362965",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F2%20week%2FBuilding%20Strength%20Of%20Knees%2F16_Antenna_Toes_new.mp4?alt=media&token=9737c12b-b563-4d4b-8224-42034efec355",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F3%20week%2FNormalization%20Of%20Knee%2F1_Squat_new.mp4?alt=media&token=a2db0d2a-2b03-4f5b-9450-8780837bce62",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FArms%20%26%20Shoulders%2F2_Arms_Circles.mp4?alt=media&token=63801937-cfdf-45b2-a323-bbc88990bca5",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FInfluencers%2FGoga%2FPower%20Hour%2F6_Back_Forth_Jump.mp4?alt=media&token=4b9d8313-f332-4996-8761-3c00d3ed0202",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F5%20week%2FLeg%20Strenthening%2F20_Back_%26_Forth_Squat.mp4?alt=media&token=59faf399-41cf-423e-b6db-8ae4c173910d",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FYoga%20Full%20Body%20Stretch%2F1_Back_Neck_Stretch.mp4?alt=media&token=d304fcb1-0e13-4c26-8f5c-efa8049d49f6",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FInfluencers%2FHafizowa%2FHigh%20Effective%20Cardio%2FBack_Plank_Kick_Hafizowa.mp4?alt=media&token=22aa16ca-b434-4843-866b-233b89ef81ff",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FInfluencers%2FHafizowa%2FCircuit%20Training%2F5_Back_Raise_Hafizowa.mp4?alt=media&token=c3b2e58e-f721-40e7-bfd7-238c3b6a15c5",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FWarming%20up%2F2_Back_Shoulder_Warm_up.mp4?alt=media&token=cf8ec56f-c3e8-4521-a885-31d6b5d84012",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FWarming%20up%2F0_Back_Stretch.mp4?alt=media&token=cbcbac48-e4c0-4190-b21b-2c8aa3661433",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2Fprobnyye%2FPosture%20Alignment%2F4_Back%20Stretch%20with%20Towel.mp4?alt=media&token=9c777f13-d47a-44b3-9030-51df96269cb3",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FChair%20Yoga%20last%2F0_Back_and_Forward_Bend.mp4?alt=media&token=aeab0df9-7da9-4ace-9b25-4a28ecbf4138",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FInfluencers%2FHafizowa%2FHigh%20Effective%20Cardio%2FBackward_Arm_Circles_Hafizowa.mp4?alt=media&token=8679b2ea-fc9c-4832-93f8-dcaf17029575",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FMobilization%2F4_Backward_Lunge_Shoulder_Twist.mp4?alt=media&token=8bd854bb-367a-4b1e-acf8-9cd40cb4d396",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FShoulder_Strengthening%2F20_Backward_Shoulders.mp4?alt=media&token=fc98df15-2749-47c5-85f2-77f95218ac5b",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F4%20week%2FPelvis%20Upgrade%2F14_Balance_Kick_new.mp4?alt=media&token=59fda7f3-54e4-4588-8da8-240495993ca7",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F5%20week%2FLeg%20Strenthening%2F12_Balance_Lunge_With_Power.mp4?alt=media&token=c2d61758-7f92-4e83-8c4a-5574b3e73170",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FReconstruction%20Of%20The%20Anterior%20Cruciate%20Ligament%2F8-12%20week%2FCruciate%20Ligaments%20Functional%20Period%20Part%201%2F9_Balance_Standing.mp4?alt=media&token=4bf1a2a5-1e4b-45c1-a9e6-5729c0479d74",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FLumbar_And_Thoracic_Vertebrates_Stretch%2FHernia%20Test%20Is%20Negative%2F8_Ball_Kick_new.mp4?alt=media&token=72a97020-2b38-438e-b53d-baf70c06e30a",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F3%20week%2FNormalization%20Of%20Knee%2F8_Ball_Kicking_Push_new.mp4?alt=media&token=63826511-8cb9-49b8-a26f-c68f41b64281",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FFull%20Recovery%20Of%20Meniscus%2F3%20week%2FNormalization%20Of%20Knee%2F5_Ball_Side_Push_new.mp4?alt=media&token=90225988-3454-4769-b909-3ee34c3c6d4f",
        "https://firebasestorage.googleapis.com/v0/b/aiwill-5f38d.appspot.com/o/ALL%20WORKOUTS%2FSlouch%2F1_0_Ball_Stretch.mp4?alt=media&token=acfb0c28-4491-47a5-8ff8-15e360a24d2f"];


      setVideoUrls(fetchedVideoUrls);
    }
  }, [cachedVideoUrls, setVideoUrls]);




  useEffect(() => {


    function getBlobFromIndexedDB(videoId: string): Promise<Blob | null> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('videoCache', 1);
        request.onerror = () => {
          reject(request.error);
        };
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction('videos', 'readonly');
          const objectStore = transaction.objectStore('videos');
          const getRequest = objectStore.get(videoId);
          getRequest.onsuccess = () => {
            resolve(getRequest.result);
          };
          getRequest.onerror = () => {
            reject(getRequest.error);
          };
        };
      });
    }




    async function cacheVideos() {
      const request = indexedDB.open('videoCache', 1);
      request.onerror = (event: any) => {
        console.error('IndexedDB error:', event.target.error);
      };
      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos');
        }
      };
      request.onsuccess = (event) => {

        videoUrls.forEach((url) => {
          getBlobFromIndexedDB(url)
            .then((blob) => {
              if (blob) {
                let array = blobed;
                array.push(blob)
                setBlobed([...array])
              } else {
                fetch(url)
                  .then((response) => response.blob())
                  .then((blob) => {

                    const db = request.result;
                    const transaction = db.transaction('videos', 'readwrite');
                    const objectStore = transaction.objectStore('videos');

                    const putRequest = objectStore.put(blob, url);
                    putRequest.onsuccess = () => {
                      console.log(`Blob ${blob} for ${url} cached successfully`);
                      let array = blobed;
                      array.push(blob)
                      setBlobed([...array])
                    };
                    putRequest.onerror = (error) => {
                      console.error(`Error caching blob for ${url}:`, error);
                    };
                  })
                  .catch((error) => {
                    console.error(`Error fetching or converting blob for ${url}:`, error);
                  });
              }
            })
            .catch((error) => {
              console.log(error)
            });



        });


        setLoading(false)

        // transaction.oncomplete = () => {
        //   console.log('Transaction completed');
        //   db.close();
        // };
        // transaction.onerror = (event: any) => {
        //   console.error('Transaction error:', event.target.error);
        // };
      };
    }


    cacheVideos()
  }, [videoUrls]);


  const next = () => {
    videoUrls.length - 1 > indexOf && setIndex(indexOf + 1)

  }

  const prev = () => {
    indexOf > 0 && setIndex(indexOf - 1)
  }



  return (
    <div className="p-0 m-0">
      {!start && !loading && <button onClick={() => setStart(true)} className='w-full px-4 py-3 text-[16px] '>Start</button>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        start ? <div className='w-full h-[100vh] relative'>
          <div className={`w-full z-20 absolute top-0 h-[6px] py-[1px] bg-[#5a5959]`}>
            <div style={{ width: (indexOf + 1) * 100 / videoUrls.length + "%" }} className={` absolute z-30 top-0 h-[4px] bg-white`}>
            </div>
          </div>
          <button onClick={() => prev()} className='fixed z-50 left-2 top-[45%] text-[#464646] bg-[#0000003d] w-[40px] h-[40px] rounded-[100%] leading-[40px] text-center font-[700]'>&lt;</button>
          <video controls controlsList="nofullscreen" autoPlay muted className="w-full absolute top-0 z-10 object-contain">
            <source src={URL.createObjectURL(blobed[indexOf])}></source>
          </video>

          <button onClick={() => next()} className='fixed z-50 right-2 top-[45%] text-[#464646] bg-[#0000003d] w-[40px] h-[40px] rounded-[100%] leading-[40px] text-center font-[700]'>&gt;</button>

        </div>
          : <div className="flex flex-wrap justify-evenly">
            {blobed.map((url, index) => (
              <div key={index} className="w-24 h-32 bg-gray-200 m-1">
                <video className="w-full h-full object-cover">
                  <source src={URL.createObjectURL(url)}></source>
                </video>
              </div>
            ))}
          </div>
      )}
    </div >
  );
};

export default App;
