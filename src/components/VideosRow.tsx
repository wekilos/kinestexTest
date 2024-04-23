import React from 'react';

interface Props {
    index: number,
    url: any
}
const VideosRow: React.FC<Props> = ({ index, url }) => {


    return (
        <div key={index} className="w-24 h-32 bg-gray-200 m-1">
            <video className="w-full h-full object-cover">
                <source src={URL.createObjectURL(url)}></source>
            </video>
        </div>
    );
};

export default React.memo(VideosRow);