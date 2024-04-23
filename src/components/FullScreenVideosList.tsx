import React from 'react';
interface Props {
    indexOf: number,
    videoUrls: string[],
    blobed: Blob[],
    next: () => void,
    prev: () => void
}
const FullScreenVideosList: React.FC<Props> = ({ indexOf, videoUrls, blobed, next, prev }) => {


    return (
        <div className='w-full h-[100vh] relative'>
            <div className={`w-full z-20 absolute top-0 h-[6px] py-[1px] bg-[#5a5959]`}>
                <div style={{ width: (indexOf + 1) * 100 / videoUrls.length + "%" }} className={` absolute z-30 top-0 h-[4px] bg-white`}>
                </div>
            </div>
            <button onClick={() => prev()} className='fixed z-50 left-2 top-[45%] text-[#464646] bg-[#0000003d] w-[40px] h-[40px] rounded-[100%] leading-[40px] text-center font-[700]'>&lt;</button>
            <video controls controlsList='nofullscreen' playsInline src={URL.createObjectURL(blobed[indexOf])} autoPlay muted className="w-full h-[100vh] absolute top-0 z-10 object-cover"></video>

            <button onClick={() => next()} className='fixed z-50 right-2 top-[45%] text-[#464646] bg-[#0000003d] w-[40px] h-[40px] rounded-[100%] leading-[40px] text-center font-[700]'>&gt;</button>

        </div>
    );
};

export default React.memo(FullScreenVideosList);