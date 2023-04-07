import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ListGroup } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
    const route = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    if (!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    async function removeHistoryClicked(event, index) {
        event.stopPropagation(); // stop the event from triggering other events
        const newSearchHistory = await removeFromHistory(searchHistory[index]);
        setSearchHistory(newSearchHistory);
    }

    function historyClicked(event, index) {
        event.preventDefault();
        route.push(`/artwork?${searchHistory[index]}`);
    }

    return (
        <>
            {parsedHistory.length === 0 && (
                <Card>
                    <Card.Body>
                        Nothing Here. Try searching for some artwork.
                    </Card.Body>
                </Card>
            )}
            {parsedHistory.length > 0 && (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item
                            key={index}
                            onClick={e => historyClicked(e, index)}
                            className={styles.historyListItem}
                        >
                            {Object.keys(historyItem).map(key => (
                                <span key={key}>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button
                                className="float-end"
                                variant="danger"
                                size="sm"
                                onClick={e => removeHistoryClicked(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
}
