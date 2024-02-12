import Paper from "paper";
import { Point } from "paper/dist/paper-core";
import { initializeConfig } from "./initializeConfig";
import { removeItemStyleToPiece, searchItemList, setItemStyleToAllPiece } from "./item";
import { setMoveEvent } from "./setMoveEvent";
import { uniteTiles } from "./uniteTiles";

const createPuzzleConfig = () => {
  let config = {};

  const initializePuzzle = ({ canvasRef, puzzleImg, level, shapes, board = [], picture }) => {
    // 단계별 config 설정
    Paper.setup(canvasRef.current);
    const initializedConfig = initializeConfig({ img: puzzleImg, level, board, shapes, picture });
    const attachedMoveEventConfig = setMoveEvent({ config: initializedConfig });
    const attachedItemToAllPieceConfig = setItemStyleToAllPiece({
      config: attachedMoveEventConfig,
      itemList: searchItemList(board),
    });

    config = attachedItemToAllPieceConfig;
  };

  const initializePuzzle2 = (config2, itemList = []) => {
    const attachedItemToAllPieceConfig = setItemStyleToAllPiece({
      config: config2,
      itemList,
    });

    config = attachedItemToAllPieceConfig;
  };

  const getConfig = () => ({ ...config });

  const lockPuzzle = (x, y, index) => {
    console.log(x, y, index);
    // TODO: "Lock"이 걸려있다는 처리해야함
    // 피그마처럼 유저별로 "색깔"을 지정해두고 border 색깔을 변경하는 것도 좋을듯?
  };

  const movePuzzle = (x, y, index) => {
    config.tiles[index].position = new Point(x, y);
  };

  const unLockPuzzle = (x, y, index) => {
    console.log(x, y, index);
    // TODO: 여기서 Lock에 대한 UI처리를 해제한다.
  };

  const addPiece = ({ fromIndex, toIndex }) => {
    const afterUnitedConfig = uniteTiles({
      config,
      preIndex: fromIndex,
      nowIndex: toIndex,
    });
    const afterCheckItemConfig = removeItemStyleToPiece({
      config: afterUnitedConfig,
      fromIndex,
      toIndex,
    });
    config = afterCheckItemConfig;
  };

  const addCombo = (fromIndex, toIndex, direction) => {
    let dir = -1;
    switch (direction) {
      case 0:
        dir = 3;
        break;
      case 1:
        dir = 0;
        break;
      case 2:
        dir = 2;
        break;
      case 3:
        dir = 1;
        break;
    }

    // console.log("addCombo 함수 실행 :", fromIndex, toIndex, direction, dir);
    // console.log(config);

    const nextConfig = uniteTiles({
      config,
      nowIndex: fromIndex,
      preIndex: toIndex,
      isSender: false,
      isCombo: true,
      direction: dir,
    });

    config = nextConfig;
  };

  const fire = (bundles, targetList) => {
    console.log(bundles, targetList);
    console.log("현재 config", config);

    // bundles의 인덱스만 담은 object
    const bundlesIdxList = [];

    bundles.forEach((group) => {
      const idxList = [];
      group.forEach((g) => {
        idxList.push(g.index);
      });
      bundlesIdxList.push(idxList);
    });

    console.log("bundlesIdxList ", bundlesIdxList);

    config.groupTiles.forEach((gtile) => {
      // target이면 그룹 해제 (undefined)
      if (targetList.includes(gtile[2])) {
        console.log("얘 target임", gtile);
        gtile[1] = undefined;

        const randomX = Math.random() * 1000;
        const randomY = Math.random() * 750;
        config.tiles[gtile[2]].position = new Point(randomX, randomY);
      }
    });
  };

  const usingItemFrame = (targetList) => {
    console.log(targetList);
    console.log(getConfig());
  };

  // 왜 자꾸 퍼즐 하나가 안붙냐...
  const usingItemMagnet = (targetList) => {
    const config = getConfig();
    const [targetPuzzleIndex, ...aroundPuzzleIndexList] = targetList;
    for (let direction = 0; direction < 4; direction += 1) {
      const puzzleIndex = aroundPuzzleIndexList[direction];
      if (puzzleIndex === -1) {
        continue;
      }
      uniteTiles({
        config,
        nowIndex: puzzleIndex,
        preIndex: targetPuzzleIndex,
        direction,
        isCombo: false,
        isSender: false,
      });
    }
  };

  return {
    initializePuzzle,
    initializePuzzle2,
    getConfig,
    lockPuzzle,
    movePuzzle,
    unLockPuzzle,
    addPiece,
    addCombo,
    fire,
    usingItemFrame,
    usingItemMagnet,
  };
};

export const configStore = createPuzzleConfig();
