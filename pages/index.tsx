import { Nextpage } from "next";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

const IndexPage: Nextpage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url);
            setLoading(false);
        });
    }, []);
    
    // 更新ボタンをクリックしたときに画像を読み込む処理
    const handleClickUpdate = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    }

    return (
        <div className={styles.page}>
            <button onClick={handleClickUpdate}>新しい猫が欲しいぞ！</button>
            <div>
                {loading || <img src={imageUrl} className={styles.catImage} />}
            </div>
        </div>
    );
};
export default IndexPage;

type Image = {
    url: string;
  };
const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};
