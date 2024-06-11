"use client";
import styles from "./page.module.css";
//Stateleri yönetmek için useState hookunu kullandım
import React, { useState } from 'react';
export default function Home() {
  //Square objeleri ve history statelerinin yönetilmesi için gerekli hooklar
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [history, setHistory] = useState<{ squares: (string | null)[]; index: number }[]>([]);

  const onBackButtonClick = () => {
    //History arrayi sıfırsa en başa dönmüşüz demektir
    if (history.length === 0) {
      alert("Geri alınacak bir hamle yok.");
      return;
    }
    //Bir hamle geriye gidiyoruz
    const lastAction = history[history.length - 1];
    setSquares(lastAction.squares);
    setHistory(history.slice(0, -1));
  };

  //Buraya alt alta 9 tane square buttonı yazmamak için bir index parametresi kullandım
  //Umarım sorun olmaz
  const onSquareClick = (index: number) => {
    //Tıklanan squarei güncelliyoruz
    const newSquares = [...squares];
    newSquares[index] = newSquares[index] === "X" ? null : "X";
    setSquares(newSquares);
    //Historyi güncelliyoruz
    setHistory([...history, { squares: [...squares], index }]);
  };

  return (
    <main className={styles.main}>
      <button className={styles.backButton} onClick={onBackButtonClick}>
        GERİ AL
      </button>
      <div className={styles.squareContainer}>
      {/* Value parametresi sadece formalite olarak gerekiyor çünkü JSX map fonksiyonu bir key değeri olmasını zorunlu kılıyor*/}
      {squares.map((value, index) => (
          <div
            key={index}
            className={styles.square}
            onClick={() => onSquareClick(index)}
          >
            {value}
            </div>
            ))}
      </div>
    </main>
  );
}
